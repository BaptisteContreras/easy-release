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
    if (await this.checkForActiveRelease()) {
      await this.resumePackage(true);

      return;
    }

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

    release.setBranchName(releaseBranchName);

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

    release.setMergeStrategy(mergeStrategy);
    release.setElementsToMerge(elementsToMerge);

    const mergeResult = await this.gitMergeHandler.handleMerge(elementsToMerge, mergeStrategy);

    release.setMergeResult(mergeResult);
    release.setConflict(mergeResult.hasConflict());
    release.setHadConflict(mergeResult.hasConflict());
    release.setError(mergeResult.hasError());
    release.setHadError(mergeResult.hasError());

    if (release.hasConflict()) {
      release.pause();
      this.logger.warning('Conflict detected, resolve it then use resume option to continue the package where it stopped');
    } else {
      if (this.configuration.canPush()) {
        this.logger.info('Lets push the release branch');
        await this.gitDriver.pushBranch(release.getBranchName());
      } else {
        this.logger.info('The release branch is not pushed');
      }
      release.terminate();
    }

    await this.releaseStorageHandler.storeRelease(release);
  }

  async resumePackage(alreadyCheck : boolean = false) : Promise<void> {
    if (!alreadyCheck && !(await this.checkForActiveRelease())) {
      this.logger.info('resume release end here.');
      process.exit(0);
    }

    const releaseName = this.releaseStorageHandler.getActiveReleaseName();

    this.logger.info(`Resume ${releaseName}`);

    const release = this.releaseStorageHandler.loadRelease(releaseName);

    this.logger.info('Release loaded');

    if (release.isTerminated()) {
      this.logger.error('This release is terminated. Cannot resume it.');
      process.exit(1);
    }

    const isStatusStable = await this.gitDriver.isGitStatusStable();

    if (isStatusStable) {
      this.logger.info('Conflict is resolved ! Lets continue');

      const currentBranchName = await this.gitDriver.getCurrentBranchName();

      if (currentBranchName !== release.getBranchName()) {
        this.logger.error('You are not currently on the good release branch name');
        this.logger.error(`Branch expected : ${release.getBranchName()} but currently :${currentBranchName}`);
        process.exit(1);
      }

      const mergeResult = release.getMergeResult();

      if (!mergeResult) {
        throw new Error('No merge result found in the resumed release');
      }

      mergeResult.setError(false);
      mergeResult.setConflict(false);

      await this.gitMergeHandler.resumeMerge(
        release.getElementsToMerge(), mergeResult, release.getMergeStrategy(),
      );

      release.setConflict(mergeResult.hasConflict());
      release.setHadConflict(mergeResult.hasConflict());
      release.setError(mergeResult.hasError());
      release.setHadError(mergeResult.hasError());

      if (release.hasConflict()) {
        release.pause();
        this.logger.warning('Conflict detected, resolve it then use resume option to continue the package where it stopped');
      } else {
        if (this.configuration.canPush()) {
          this.logger.info('Lets push the release branch');
          await this.gitDriver.pushBranch(release.getBranchName());
        } else {
          this.logger.info('The release branch is not pushed');
        }
        release.terminate();
        this.logger.info('Done !');
      }

      await this.releaseStorageHandler.updateRelease(release);

      return;
    }

    this.logger.error('Conflict is not resolved ! We stop here');
    process.exit(1);
  }

  async appendPackage() : Promise<void> {
    if (await this.checkForActiveRelease()) {
      await this.resumePackage(true);

      return;
    }

    this.logger.info('Please select a branch to append commits');
    const branchNameToAppend = await this.userInteractionHandler
      .handleAskUserToSelectBranchNameToAppend();

    this.logger.info(`You chose ${branchNameToAppend} as the branch to append new commits`);

    await this.gitDriver.fetchAll();
    await this.gitDriver.checkoutAndPullBaseBranch(branchNameToAppend);

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

    release.setBranchName(branchNameToAppend);

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

    release.setMergeStrategy(mergeStrategy);
    release.setElementsToMerge(elementsToMerge);

    const mergeResult = await this.gitMergeHandler.handleMerge(elementsToMerge, mergeStrategy);

    release.setMergeResult(mergeResult);
    release.setConflict(mergeResult.hasConflict());
    release.setHadConflict(mergeResult.hasConflict());
    release.setError(mergeResult.hasError());
    release.setHadError(mergeResult.hasError());

    if (release.hasConflict()) {
      release.pause();
      this.logger.warning('Conflict detected, resolve it then use resume option to continue the package where it stopped');
    } else {
      if (this.configuration.canPush()) {
        this.logger.info('Lets push the release branch');
        await this.gitDriver.pushBranch(release.getBranchName());
      } else {
        this.logger.info('The release branch is not pushed');
      }
      release.terminate();
    }

    await this.releaseStorageHandler.storeRelease(release);
  }

  async run() : Promise<void> {
    this.logger.info('EasyReleasePackager run');
    await this.selectAction();
    this.logger.info('EasyReleasePackager is done !');
  }

  /** Choose which action to do base on the CLI options * */
  private async selectAction() : Promise<void> {
    if (this.configuration.isRelease()) {
      this.logger.info('release action');
      await this.startPackage();
    } else if (this.configuration.isResume()) {
      this.logger.info('resume action');
      await this.resumePackage();
    } else if (this.configuration.isAppend()) {
      this.logger.info('append action');
      await this.appendPackage();
    } else {
      this.logger.info('default action : release');
      await this.startPackage();
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
    this.displayer.displayMrToDeliver(mrsSelected);

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

  /** Returns true is the user wants to resume the current release * */
  private async checkForActiveRelease() : Promise<boolean> {
    this.logger.debug('Check for active release to resume');

    if (this.releaseStorageHandler.hasActiveRelease()) {
      this.logger.debug('Active release found !');

      const activeReleaseName = this.releaseStorageHandler.getActiveReleaseName();

      this.logger.info(`Active release name : ${activeReleaseName}`);

      return this.userInteractionHandler
        .handleAskUserIfHeWantsToResumeTheActiveRelease(activeReleaseName);
    }

    this.logger.info('No active release found');

    return false;
  }
}
