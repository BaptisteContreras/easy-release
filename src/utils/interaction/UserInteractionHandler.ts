import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';
import AbstractCommit from '../../model/common/AbstractCommit';

export default interface UserInteractionHandler {
  /** This method returns true if the user wants to remove some MR from the delivery process * */
  handleAskUserIfHeWantsToRemoveMr(): Promise<boolean>

  /** This method let the user pick a MR to remove from the release process  * */
  handleAskUserMrToRemove(mrsToDeliver : AbstractMergeRequest[]): Promise<AbstractMergeRequest>

  /** This method ask the user if he wants to change the release branch name * */
  handleAskUserToChangeReleaseBranchName(releaseBranchName :string) : Promise<string>;

  /** This method ask the user if he wants to change the current merge strategy  * */
  handleAskUserToChangeMergeStrategy(currentMergeStrategy : string) : Promise<string>;

  /** This methods returns true if the user wants to unselect a commit */
  handleAskUserIfHeWantsToUnselectCommits() : Promise<boolean>;

  /** This method let the user pick a commit to unselect from the merge  * */
  handleAskUserCommitToUnselect(commitsToMerge : AbstractCommit[]): Promise<AbstractCommit>

  /** This methods returns true if the user wants to resume an active release */
  handleAskUserIfHeWantsToResumeTheActiveRelease(activeReleaseName: string) : Promise<boolean>;

}
