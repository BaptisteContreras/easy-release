import GitHub from 'github-api';
import AbstractVcsDriver from './AbstractVcsDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import LoggerInterface from '../../logger/LoggerInterface';

export default class GithubVcsDriver implements AbstractVcsDriver {
  /**            Properties           * */
  private githubLib : GitHub;

  private repositoryName : string;

  private organisationName : string;

  private logger : LoggerInterface;

  constructor(
    githubLib: GitHub, repositoryName: string, organisationName: string, logger : LoggerInterface,
  ) {
    this.githubLib = githubLib;
    this.repositoryName = repositoryName;
    this.organisationName = organisationName;
    this.logger = logger;
    logger.info('GithubVcsDriver created');
  }

  /**            Methods           * */

  // eslint-disable-next-line class-methods-use-this
  getIssuesLinked(): AbstractIssue[] {
    // TODO
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  getIssuesLinkedTo(linkedMrs: AbstractMergeRequest[]): AbstractIssue[] {
    // TODO
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  getOpenMrs(): AbstractMergeRequest[] {
  //  this.githubLib.listPullRequests({ sss: '' }, (pr) => {return pr});
    // TODO
    return [];
  }
}
