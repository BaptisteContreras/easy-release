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

export default class EasyReleasePackager {
  /**            Properties           * */

  private repository : AbstractVcsRepository;

  private configuration : Configuration;

  private logger : LoggerInterface;

  private displayer : InformationDisplayer;

  private userInteractionHandler : UserInteractionHandler;

  private gitDriver : GitDriver;

  private gitMergeHandler : GitMergeHandler;

  constructor(
    repository : AbstractVcsRepository, configuration : Configuration,
    logger : LoggerInterface, displayer : InformationDisplayer,
    userInteractionHandler : UserInteractionHandler, gitDriver : GitDriver,
    gitMergeHandler : GitMergeHandler,
  ) {
    this.repository = repository;
    this.configuration = configuration;
    this.logger = logger;
    this.displayer = displayer;
    this.userInteractionHandler = userInteractionHandler;
    this.gitDriver = gitDriver;
    this.gitMergeHandler = gitMergeHandler;

    this.logger.info('EasyReleasePackager application created !');
  }

  async startPackage() : Promise<void> {
    this.logger.info('Fetch MR to deliver');
    let mrsToDeliver = await this.repository.getMrToDeliver(
      this.configuration.getLabelsDeliver(),
    );
    this.logger.info(`${mrsToDeliver.length} MR to deliver found`);
    this.canContinueDeliveryProcess(mrsToDeliver);

    this.displayer.displayMrToDeliver(mrsToDeliver);

    let userRequestRemoveMR = await this.userInteractionHandler.handleAskUserIfHeWantsToRemoveMr();
    while (userRequestRemoveMR && mrsToDeliver.length !== 0) {
      this.logger.debug('User answered yes to remove a MR from the process');
      try {
        // eslint-disable-next-line no-await-in-loop
        const mrToRemove = await this.userInteractionHandler.handleAskUserMrToRemove(mrsToDeliver);
        this.logger.info(`The MR #${mrToRemove.getNumber()} has been removed from the process`);
        mrsToDeliver = mrsToDeliver.filter((mr) => mr.getNumber() !== mrToRemove.getNumber());
        this.canContinueDeliveryProcess(mrsToDeliver);
        this.displayer.displayMrToDeliver(mrsToDeliver);
        // eslint-disable-next-line no-await-in-loop
        userRequestRemoveMR = await this.userInteractionHandler.handleAskUserIfHeWantsToRemoveMr();
      } catch (error) {
        this.logger.warning('Cancel MR removing selection');
        userRequestRemoveMR = false;
      }
    }

    this.logger.info('Continuing delivery process with the remaining MRs');
    this.displayer.displayMrToDeliver(mrsToDeliver);

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

    this.gitMergeHandler.handleMerge([], mergeStrategy);

    const commitsToCherryPick = await this.repository.getCommitsToCherryPick(mrsToDeliver);
    console.log(mergeStrategy);
    console.log(commitsToCherryPick);
    console.log('CONTINUE');
  }

  // eslint-disable-next-line class-methods-use-this
  resumePackage() : void {

  }

  async run() : Promise<void> {
    this.logger.info('EasyReleasePackager run');
    this.selectAction();
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
}
