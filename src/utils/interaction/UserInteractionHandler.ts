import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';
import MergeStrategy from '../../model/enum/MergeStrategy';

export default interface UserInteractionHandler {
  /** This method returns true if the user wants to remove some MR from the delivery process * */
  handleAskUserIfHeWantsToRemoveMr(): Promise<boolean>

  /** This method let the use pick a MR to remove from the release process  * */
  handleAskUserMrToRemove(mrsToDeliver : AbstractMergeRequest[]): Promise<AbstractMergeRequest>

  handleAskUserToChangeReleaseBranchName(releaseBranchName :string) : Promise<string>;

  handleAskUserToChangeMergeStrategy(currentMergeStrategy : string) : Promise<string>;
}
