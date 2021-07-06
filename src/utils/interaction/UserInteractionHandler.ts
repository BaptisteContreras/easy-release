import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';

export default interface UserInteractionHandler {
  /** This method returns true if the user wants to remove some MR from the delivery process * */
  handleAskUserIfHeWantsToRemoveMr(): Promise<boolean>

  /** This method let the use pick a MR to remove from the release process  * */
  handleAskUserMrToRemove(mrsToDeliver : AbstractMergeRequest[]): Promise<AbstractMergeRequest>
}
