import AbstractVcsDriver from './AbstractVcsDriver';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';

export default class GithubVcsDriver implements AbstractVcsDriver {
  /**            Properties           * */
  private githubLib : any;

  /**            Methods           * */

  getIssuesLinked(): AbstractIssue[] {
    return [];
  }

  getIssuesLinkedTo(linkedMrs: AbstractMergeRequest[]): AbstractIssue[] {
    return [];
  }

  getOpenMrs(): AbstractMergeRequest[] {
    return [];
  }
}
