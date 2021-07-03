import AbstractVcsDriver from './AbstractVcsDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import LoggerInterface from '../../logger/LoggerInterface';
import PullRequest from '../../../model/github/PullRequest';
import GithubOwner from '../../../model/github/GithubOwner';

export default class GithubVcsDriver implements AbstractVcsDriver {
  /**            Properties           * */
  private githubLib : any;

  private repositoryName : string;

  private organisationName : string;

  private logger : LoggerInterface;

  private repo : any;

  constructor(
    githubLib: any, repositoryName: string, organisationName: string, logger : LoggerInterface,
  ) {
    this.githubLib = githubLib;
    this.repositoryName = repositoryName;
    this.organisationName = organisationName;
    this.logger = logger;
    logger.info('GithubVcsDriver created');
    this.repo = null;
  }

  /**            Methods           * */

  // eslint-disable-next-line class-methods-use-this
  getIssuesLinked(linkedMr: AbstractMergeRequest): AbstractIssue[] {
    // TODO

    /**
     *  const repo = this.githubLib.getRepo(this.organisationName, this.repositoryName);
     const ts = this.githubLib
     .getIssues(this.organisationName, this.repositoryName).listIssues({}, (s : any, e : any) => {
        console.log(e);
      });
     * repo.listPullRequests({
      state: 'open',
    }, async (err : any, prs : any) => {
      console.log(`LENGTH${prs.length}`);
      prs.forEach((el : any) => {
        console.log(`BODY ${el.body}`);
        // console.log(el);
      });
    });
     */
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  getIssuesLinkedTo(linkedMrs: AbstractMergeRequest[]): AbstractIssue[] {
    // TODO
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  async getOpenMrs(): Promise<AbstractMergeRequest[]> {
    const prs = await this.getRepo().listPullRequests({
      state: 'open',
    });
    const prList : AbstractMergeRequest[] = [];

    prs.data.forEach((el : any) => {
      prList.push(
        GithubVcsDriver.buildMr(el),
      );
    });

    return prList;
  }

  /** Return the github-api repo from cache, otherwise, init and cache it !  * */
  private getRepo(): any {
    if (!this.repo) {
      this.repo = this.githubLib.getRepo(this.organisationName, this.repositoryName);
    }

    return this.repo;
  }

  /** Build a PullRequest from a github-api PR object * */
  private static buildMr(githubPr : any) : AbstractMergeRequest {
    return new PullRequest(
      githubPr.title,
      githubPr.url,
      this.buildOwner(githubPr.user),
    );
  }

  /** Build a GithubOwner from a github-api user object * */
  private static buildOwner(rawGithubOwner : any) : GithubOwner {
    return new GithubOwner(
      rawGithubOwner.login,
      rawGithubOwner.html_url,
    );
  }
}
