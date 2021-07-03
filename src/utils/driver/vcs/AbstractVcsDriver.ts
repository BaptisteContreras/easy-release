import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';

export default interface AbstractVcsDriver {

  /** Returns the list of all issues linked to an open MR in the given list * */
  getIssuesLinkedTo(linkedMrs: AbstractMergeRequest[]) : AbstractIssue[];

  /** Returns the list of all issues linked to an open MR * */
  getIssuesLinked(linkedMr: AbstractMergeRequest) : AbstractIssue[];

  /** Returns the list of all open MR * */
  getOpenMrs() : Promise<AbstractMergeRequest[]>;

}
