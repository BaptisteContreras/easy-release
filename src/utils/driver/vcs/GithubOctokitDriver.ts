import { Octokit } from '@octokit/rest';
import AbstractVcsPlatformDriver from './AbstractVcsPlatformDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import LoggerInterface from '../../logger/LoggerInterface';
import PullRequest from '../../../model/github/PullRequest';
import GithubUser from '../../../model/github/GithubUser';
import GithubIssue from '../../../model/github/GithubIssue';
import GithubLabel from '../../../model/github/GithubLabel';
import OctokitBuilder from '../../builder/platform/github/OctokitBuilder';
import GithubCommit from '../../../model/github/GithubCommit';
import AbstractCommit from '../../../model/common/AbstractCommit';

export default class GithubOctokitDriver implements AbstractVcsPlatformDriver {
  /**            Properties           * */
  private octokitClient : Octokit;

  private repositoryName : string;

  private organisationName : string;

  private logger : LoggerInterface;

  /**            Constructor           * */

  constructor(
    octokitClient: Octokit, repositoryName: string,
    organisationName: string, logger : LoggerInterface,
  ) {
    this.octokitClient = octokitClient;
    this.repositoryName = repositoryName;
    this.organisationName = organisationName;
    this.logger = logger;
    logger.info('GithubOctokitDriver created');
  }

  /**            Methods           * */

  async getCommitsForMr(mr: AbstractMergeRequest): Promise<AbstractCommit[]> {
    const rawCommits = (await this.octokitClient.rest.pulls.listCommits({
      owner: this.organisationName,
      repo: this.repositoryName,
      pull_number: mr.getNumber(),
    })).data;

    const commits : GithubCommit[] = [];

    rawCommits.forEach((el : any) => {
      commits.push(OctokitBuilder.buildCommit(el));
    });

    return commits;
  }

  // eslint-disable-next-line class-methods-use-this
  async getLinkedIssue(linkedMr: AbstractMergeRequest): Promise<AbstractIssue | null> {
    const linkedIssueId = linkedMr.getLinkedIssueId();
    if (!linkedIssueId) {
      this.logger.warning(`PR ${linkedMr.getTitle()} has no linked issue ID. Add an #issueId in the PR's body to link an issue.`);

      return null;
    }

    try {
      const rawIssue = (await this.octokitClient.rest.issues.get({
        owner: this.organisationName,
        repo: this.repositoryName,
        issue_number: parseInt(linkedIssueId, 10),
      })).data;
      if (!rawIssue) {
        this.logger.warning(`PR ${linkedMr.getTitle()} linked to issue #${linkedIssueId} : Issue not found with Github API. Are you sure this issue ID is correct ?`);

        return null;
      }

      this.logger.debug(`PR ${linkedMr.getTitle()} linked to issue #${linkedIssueId} : Issue found !`);

      return OctokitBuilder.buildIssue(rawIssue);
    } catch (error) {
      this.logger.warning(`PR ${linkedMr.getTitle()} linked to issue #${linkedIssueId} : Issue not found with Github API. Are you sure this issue ID is correct ?`);

      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getOpenMrs(): Promise<AbstractMergeRequest[]> {
    const prs = await this.octokitClient.rest.pulls.list({
      owner: this.organisationName,
      repo: this.repositoryName,
      state: 'open',
    });
    const prList : AbstractMergeRequest[] = [];

    prs.data.forEach((el : any) => {
      prList.push(
        OctokitBuilder.buildMr(el, this.extractIssueIdFromPrBody(el.body)),
      );
    });

    return prList;
  }

  /** Return the linked issue's id contained in the body of the PR
   *  (# followed by the id : #1 * */
  private extractIssueIdFromPrBody(githubPrBody : string) : string {
    const bodyMatchs = githubPrBody.match('#[1-9][0-9]*');

    if (bodyMatchs === null) {
      return '';
    }

    this.logger.debug(`body match : ${bodyMatchs.length}`);
    this.logger.debug(`[DEBUG] body match 2 : ${bodyMatchs[0]}`);
    this.logger.debug(`[DEBUG] body match 3: ${bodyMatchs[0].match('[1-9]+')}`);
    if (bodyMatchs.length > 1) {
      this.logger.warning(`${'Several linked issue ID found in a Github'
      + 'PR body : The first one will be chosen. PR body dump : ['}${githubPrBody}]`);
    }

    const realId = bodyMatchs[0].match('[1-9]+');
    return realId !== null ? realId[0] : '';
  }
}
