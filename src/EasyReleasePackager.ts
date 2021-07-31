import AbstractVcsRepository from './utils/repository/AbstractVcsRepository';
import Configuration from './model/configuration/Configuration';
import LoggerInterface from './utils/logger/LoggerInterface';
import InformationDisplayer from './utils/display/InformationDisplayer';
import UserInteractionHandler from './utils/interaction/UserInteractionHandler';
import AbstractMergeRequest from './model/common/AbstractMergeRequest';
import GitDriver from './utils/driver/git/GitDriver';
import GitTools from './utils/tools/GitTools';
import GitMergeHandler from './utils/merge/GitMergeHandler';
import MergeStrategy from './model/enum/MergeStrategy';
import MergeableElement from './utils/merge/MergeableElement';
import AbstractCommit from './model/common/AbstractCommit';
import Release from './model/release/Release';
import ReleaseStorageHandler from './utils/release/storage/ReleaseStorageHandler';

export default class EasyReleasePackager {
  /**            Properties           * */

  private repository : AbstractVcsRepository;

  private configuration : Configuration;

  private logger : LoggerInterface;

  private displayer : InformationDisplayer;

  private userInteractionHandler : UserInteractionHandler;

  private gitDriver : GitDriver;

  private gitMergeHandler : GitMergeHandler;

  private releaseStorageHandler: ReleaseStorageHandler;

  constructor(
    repository : AbstractVcsRepository, configuration : Configuration,
    logger : LoggerInterface, displayer : InformationDisplayer,
    userInteractionHandler : UserInteractionHandler, gitDriver : GitDriver,
    gitMergeHandler : GitMergeHandler, releaseStorageHandler : ReleaseStorageHandler,
  ) {
    this.repository = repository;
    this.configuration = configuration;
    this.logger = logger;
    this.displayer = displayer;
    this.userInteractionHandler = userInteractionHandler;
    this.gitDriver = gitDriver;
    this.gitMergeHandler = gitMergeHandler;
    this.releaseStorageHandler = releaseStorageHandler;

    this.logger.info('EasyReleasePackager application created !');
  }

  async startPackage() : Promise<void> {
    const release = new Release();
    this.logger.info('Fetch MR to deliver');
    let mrsToDeliver = await this.repository.getMrToDeliver(
      this.configuration.getLabelsDeliver(),
    );
    this.logger.info(`${mrsToDeliver.length} MR to deliver found`);
    this.canContinueDeliveryProcess(mrsToDeliver);

    this.displayer.displayMrToDeliver(mrsToDeliver);

    mrsToDeliver = await this.handleMRSelection(mrsToDeliver);

    release.setMr(mrsToDeliver);

    const baseReleaseBranchName = GitTools.handleGitReleaseName(
      this.configuration.getReleaseBranchName(), this.configuration.getProfile(),
    );

    this.logger.debug(`From release branch name format ${this.configuration.getReleaseBranchName()} generate ${baseReleaseBranchName}`);

    const releaseBranchName = await this.userInteractionHandler
      .handleAskUserToChangeReleaseBranchName(baseReleaseBranchName);

    this.logger.info(`${releaseBranchName} is the current release branch name`);

    await this.gitDriver.checkoutAndPullBaseBranch(
      this.configuration.getBaseReleaseBranch(),
    );

    await this.gitDriver.createAndCheckoutReleaseBranch(
      releaseBranchName,
    );

    const mergeStrategy = await this.userInteractionHandler
      .handleAskUserToChangeMergeStrategy(this.configuration.getMergeStrategy());

    let elementsToMerge : MergeableElement[] = [];
    if (mergeStrategy === MergeStrategy.CHERRY_PICK) {
      elementsToMerge = await this.handleCommitSelection(
        await this.repository.getCommitsToCherryPick(mrsToDeliver),
      );
    } else {
      this.logger.error('BRANCH MERGE IS NOT IMPLEMENTED YET');
      process.exit(1);
    }

    release.setElementsToMerge(elementsToMerge);

    const mergeResult = await this.gitMergeHandler.handleMerge(elementsToMerge, mergeStrategy);

    release.setMergeResult(mergeResult);
    release.setConflict(mergeResult.hasConflict());
    release.setError(mergeResult.hasError());

    // console.log(elementsToMerge);

    release.terminate();

    this.releaseStorageHandler.storeRelease(release);
    console.log(release);
  }

  // eslint-disable-next-line class-methods-use-this
  resumePackage() : void {

  }

  async run() : Promise<void> {
    this.logger.info('EasyReleasePackager run');
    this.selectAction();
    this.logger.info('EasyReleasePackager is done !');
  }

  /** Choose which action to do base on the CLI options * */
  private selectAction() : void {
    if (this.configuration.isRelease()) {
      this.logger.info('release action');
      this.startPackage();
    } else if (this.configuration.isResume()) {
      this.logger.info('resume action');
      this.resumePackage();
    } else {
      this.logger.info('default action : release');
      this.startPackage();
    }
  }

  /** Stop the delivery process if the running conditions are not met  * */
  private canContinueDeliveryProcess(mrsToDeliver : AbstractMergeRequest[]) : void {
    if (mrsToDeliver.length === 0) {
      this.logger.info('No MR to deliver --> delivery process end here');
      this.logger.info('GoodBye !');

      process.exit();
    }
  }

  /** Stop the merge process if the running conditions are not met  * */
  private canContinueMergeProcess(elementsToMerge : MergeableElement[]) : void {
    if (elementsToMerge.length === 0) {
      this.logger.info('No elements to merge --> delivery process end here');
      this.logger.info('GoodBye !');

      process.exit(0);
    }
  }

  /** Enable the user to unselect mr to deliver * */
  private async handleMRSelection(
    mrsToDeliver : AbstractMergeRequest[],
  ) : Promise<AbstractMergeRequest[]> {
    let mrsSelected = mrsToDeliver;
    let userRequestRemoveMR = await this.userInteractionHandler.handleAskUserIfHeWantsToRemoveMr();
    while (userRequestRemoveMR && mrsSelected.length !== 0) {
      this.logger.debug('User answered yes to remove a MR from the process');
      try {
        // eslint-disable-next-line no-await-in-loop
        const mrToRemove = await this.userInteractionHandler.handleAskUserMrToRemove(mrsSelected);
        this.logger.info(`The MR #${mrToRemove.getNumber()} has been removed from the process`);
        mrsSelected = mrsSelected.filter((mr) => mr.getNumber() !== mrToRemove.getNumber());
        this.canContinueDeliveryProcess(mrsSelected);
        this.displayer.displayMrToDeliver(mrsSelected);
        // eslint-disable-next-line no-await-in-loop
        userRequestRemoveMR = await this.userInteractionHandler.handleAskUserIfHeWantsToRemoveMr();
      } catch (error) {
        this.logger.warning('Cancel MR removing selection');
        userRequestRemoveMR = false;
      }
    }

    this.logger.info('Continuing delivery process with the remaining MRs');
    this.displayer.displayMrToDeliver(mrsToDeliver);

    return mrsSelected;
  }

  /** Enable the user to unselect commit to merge * */
  private async handleCommitSelection(
    commitsToMerge : AbstractCommit[],
  ) : Promise<AbstractCommit[]> {
    let commitSelected = commitsToMerge;

    this.logger.info('Theses commits are about to be delivered');
    this.displayer.displayCommitsToMerge(commitsToMerge);

    let userRequestRemoveCommit = await this.userInteractionHandler
      .handleAskUserIfHeWantsToUnselectCommits();
    while (userRequestRemoveCommit && commitSelected.length !== 0) {
      this.logger.debug('User answered yes to remove a commit from the process');
      try {
        // eslint-disable-next-line no-await-in-loop
        const commitToUnselect = await this.userInteractionHandler
          .handleAskUserCommitToUnselect(commitSelected);

        this.logger.info(`The commit ${commitToUnselect.getSha()} has been removed from the process`);

        commitSelected = commitSelected
          .filter((commit) => commit.getNodeId() !== commitToUnselect.getNodeId());

        this.canContinueMergeProcess(commitSelected);

        this.displayer.displayCommitsToMerge(commitSelected);
        // eslint-disable-next-line no-await-in-loop
        userRequestRemoveCommit = await this.userInteractionHandler
          .handleAskUserIfHeWantsToUnselectCommits();
      } catch (error) {
        this.logger.warning('Cancel Commit removing selection');
        userRequestRemoveCommit = false;
      }
    }

    this.logger.info('Continuing merge process with the remaining Commits');
    this.displayer.displayCommitsToMerge(commitSelected);

    return commitSelected;
  }
}
