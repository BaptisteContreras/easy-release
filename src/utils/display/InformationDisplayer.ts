import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';
import AbstractCommit from '../../model/common/AbstractCommit';

export default interface InformationDisplayer {

  /** Display in the terminal an array with all MR to deliver * */
  displayMrToDeliver(mrsToDeliver : AbstractMergeRequest[]) : void;

  /** Display in the terminal an array with all commits to deliver * */
  displayCommitsToMerge(commitsToDeliver : AbstractCommit[]) : void;
}
