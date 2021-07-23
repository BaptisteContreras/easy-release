import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import AbstractCommit from '../../../model/common/AbstractCommit';

export default interface AbstractVcsPlatformDriver {

  /** Returns the linked issue to the given MR * */
  getLinkedIssue(linkedMr: AbstractMergeRequest) : Promise<AbstractIssue | null>;

  /** Returns the list of all open MR * */
  getOpenMrs() : Promise<AbstractMergeRequest[]>;

  /** Returns the list of all commits for this MR * */
  getCommitsForMr(mr : AbstractMergeRequest) : Promise<AbstractCommit[]>;
}
