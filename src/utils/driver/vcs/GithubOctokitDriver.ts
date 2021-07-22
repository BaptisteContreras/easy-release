import { Octokit } from '@octokit/rest';
import AbstractVcsPlatformDriver from './AbstractVcsPlatformDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import LoggerInterface from '../../logger/LoggerInterface';
import PullRequest from '../../../model/github/PullRequest';
import GithubUser from '../../../model/github/GithubUser';
import GithubIssue from '../../../model/github/GithubIssue';
import GithubLabel from '../../../model/github/GithubLabel';

export default class GithubOctokitDriver implements AbstractVcsPlatformDriver {
  /**            Properties           * */
  private octokitClient : Octokit;

  private repositoryName : string;

  private organisationName : string;

  private logger : LoggerInterface;

  private repo : any;

  private issues : any;

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
    this.repo = null;
    this.issues = null;
  }

  /**            Methods           * */
  // eslint-disable-next-line class-methods-use-this
  async getCommitsForMr(mr: AbstractMergeRequest): Promise<void> {
    const a = await this.getRepo().getPullRequest(mr.getNumber());

    console.log(a.data);
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

      return GithubOctokitDriver.buildIssue(rawIssue);
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
        this.buildMr(el),
      );
    });

    return prList;
  }

  /** Return the github-api repo from cache, otherwise, init and cache it !  * */
  private getRepo(): any {
    if (!this.repo) {
      //   this.repo = this.githubLib.getRepo(this.organisationName, this.repositoryName);
    }

    return this.repo;
  }

  /** Return the github-api issues from cache, otherwise, init and cache it !  * */
  private getIssues(): any {
    if (!this.issues) {
      //     this.issues = this.githubLib.getIssues(this.organisationName, this.repositoryName);
    }

    return this.issues;
  }

  /** Build a PullRequest from an Octokit PR object * */
  private buildMr(githubPr : any) : AbstractMergeRequest {
    return new PullRequest(
      githubPr.title,
      githubPr.url,
      GithubOctokitDriver.buildOwner(githubPr.user),
      githubPr.body,
      this.extractIssueIdFromPrBody(githubPr.body),
      githubPr.state,
      new Date(githubPr.created_at),
      githubPr.updated_at ? new Date(githubPr.updated_at) : null,
      githubPr.number,
    );
  }

  /** Build a GithubIssue from an Octokit issue object * */
  private static buildIssue(githubIssue : any) : GithubIssue {
    return new GithubIssue(
      githubIssue.title,
      githubIssue.url,
      githubIssue.labels.map((githubLabel : any) => this.buildLabel(githubLabel)),
      this.buildOwner(githubIssue.user),
      githubIssue.id,
      githubIssue.number,
    );
  }

  /** Build a GithubLabel from an Octokit label object * */
  private static buildLabel(githubLabel : any) : GithubLabel {
    return new GithubLabel(
      githubLabel.name,
      githubLabel.url,
      githubLabel.id,
      githubLabel.description,
    );
  }

  /** Build a GithubUser from an Octokit user object * */
  private static buildOwner(rawGithubOwner : any) : GithubUser {
    return new GithubUser(
      rawGithubOwner.login,
      rawGithubOwner.html_url,
      rawGithubOwner.id,
    );
  }

  /** Return the linked issue's id contained in the body of the PR
   *  (# followed by the id : #1 * */
  private extractIssueIdFromPrBody(githubPrBody : string) : string {
    const bodyMatchs = githubPrBody.match('#[1-9][0-9]*');

    if (bodyMatchs === null) {
      return '';
    }

    this.logger.debug(`body match : ${bodyMatchs.length}`);
    if (bodyMatchs.length > 1) {
      this.logger.warning(`${'Several linked issue ID found in a Github'
          + 'PR body : The first one will be chosen. PR body dump : ['}${githubPrBody}]`);
    }

    const realId = bodyMatchs[0].match('[1-9]+');
    return realId !== null ? realId[0] : '';
  }
}
