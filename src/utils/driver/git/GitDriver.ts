import LoggerInterface from '../../logger/LoggerInterface';
import Configuration from '../../../model/configuration/Configuration';
import GitMergeResult from '../../../model/git/GitMergeResult';

const { exec } = require('child_process');

export default class GitDriver {
  /**            Properties           * */

  private logger : LoggerInterface;

  private configuration : Configuration;

  /**            Constructor           * */

  constructor(logger: LoggerInterface, configuration : Configuration) {
    this.logger = logger;
    this.configuration = configuration;
    this.logger.info('GitDriver created');
  }

  /** Update local base branch before using it * */
  checkoutAndPullBaseBranch(baseBranch : string) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info(`checkout and pull base branch : ${baseBranch}`);
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git checkout ${baseBranch} && git pull origin ${baseBranch}"`);
      const process = exec(`git checkout ${baseBranch} && git pull origin ${baseBranch}`, {
        cwd: this.configuration.getCwd(),
      });

      process.stderr.on('data', (data : any) => {
        this.logger.warning(data);
      });

      process.stdout.on('data', (data : any) => {
        this.logger.debug(data);
      });

      process.on('close', (retCode : number) => {
        if (retCode === 0) {
          resolve();
        } else {
          this.logger.error(`checkoutAndPullBaseBranch : Failed with code ${retCode}`);
          reject();
        }
      });
    });
  }

  /** Create the new release branch in the current git repository * */
  createAndCheckoutReleaseBranch(
    releaseBranchName : string,
  ) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info('create and checkout to release branch');
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git checkout -b ${releaseBranchName}`);
      const process = exec(`git checkout -b ${releaseBranchName}`, {
        cwd: this.configuration.getCwd(),
      });

      process.stderr.on('data', (data : any) => {
        this.logger.debug(data);
      });

      process.stdout.on('data', (data : any) => {
        this.logger.warning(data);
      });
      process.on('close', (retCode : number) => {
        if (retCode === 0) {
          resolve();
        } else {
          this.logger.error(`createAndCheckoutReleaseBranch : Failed with code ${retCode}`);
          reject();
        }
      });
    });
  }

  cherryPick(commitSha : string) : Promise<GitMergeResult> {
    return new Promise((resolve, reject) => {
      this.logger.info('cherry pick a commit');
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git cherry-pick  ${commitSha}`);
      const process = exec(`git cherry-pick ${commitSha}`, {
        cwd: this.configuration.getCwd(),
      });

      let errorData = '';

      process.stderr.on('data', (data : any) => {
        this.logger.debug(data);
        errorData += data;
      });

      process.stdout.on('data', (data : any) => {
        this.logger.debug(data);
      });

      process.on('close', (retCode : number) => {
        console.log(retCode);
        const hasConflict = errorData !== '' && this.hasCherryPickConflict(errorData);
        resolve(new GitMergeResult(
          retCode !== 0 && !hasConflict,
          hasConflict,
          errorData !== '' && this.hasCherryPickNoAction(errorData),
          commitSha,

        ));
      });
    });
  }

  /** Returns true if the git message contains a track of a conflict * */
  // eslint-disable-next-line class-methods-use-this
  private hasCherryPickConflict(gitMessage : string) : boolean {
    return gitMessage.match('conflict') !== null;
  }

  /** Returns true if the git message contains a track that the commit is already on the branch * */
  // eslint-disable-next-line class-methods-use-this
  private hasCherryPickNoAction(gitMessage : string) : boolean {
    return gitMessage.match('allow-empty') !== null;
  }
}
