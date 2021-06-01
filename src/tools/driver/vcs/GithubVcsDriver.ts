import GitHub from 'github-api';
import AbstractVcsDriver from './AbstractVcsDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';

export default class GithubVcsDriver implements AbstractVcsDriver {
  /**            Properties           * */
  private githubLib : GitHub;

  private repositoryName : String;

  private organisationName : String;

  constructor(githubLib: GitHub, repositoryName: String, organisationName: String) {
    this.githubLib = githubLib;
    this.repositoryName = repositoryName;
    this.organisationName = organisationName;
  }

  /**            Methods           * */

  getIssuesLinked(): AbstractIssue[] {
    return [];
  }

  getIssuesLinkedTo(linkedMrs: AbstractMergeRequest[]): AbstractIssue[] {
    return [];
  }

  getOpenMrs(): AbstractMergeRequest[] {
  //  this.githubLib.listPullRequests({ sss: '' }, (pr) => {return pr});
    return [];
  }
}
