import GitHub from 'github-api';
import AbstractVcsDriver from './AbstractVcsDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';

export default class GithubVcsDriver implements AbstractVcsDriver {
  /**            Properties           * */
  private githubLib : GitHub;

  private repositoryName : string;

  private organisationName : string;

  constructor(githubLib: GitHub, repositoryName: string, organisationName: string) {
    this.githubLib = githubLib;
    this.repositoryName = repositoryName;
    this.organisationName = organisationName;
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
