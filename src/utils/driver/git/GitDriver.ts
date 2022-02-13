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
        const hasConflict = errorData !== '' && GitDriver.hasCherryPickConflict(errorData);
        resolve(new GitMergeResult(
          retCode !== 0 && !hasConflict,
          hasConflict,
          errorData !== '' && GitDriver.hasCherryPickNoAction(errorData),
          commitSha,

        ));
      });
    });
  }

  /** No rebase, conflict or merge * */
  isGitStatusStable(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.info('git status');
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git status`);
      const process = exec('git status', {
        cwd: this.configuration.getCwd(),
      });

      let errorData = '';
      let outputData = '';

      process.stderr.on('data', (data : any) => {
        this.logger.debug(data);
        errorData += data;
      });

      process.stdout.on('data', (data : any) => {
        this.logger.debug(data);
        outputData += data;
      });

      process.on('close', (retCode : number) => {
        resolve(
          retCode === 0 && GitDriver.isStatusOk(outputData) && GitDriver.isStatusOk(errorData),
        );
      });
    });
  }

  getCurrentBranchName(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.logger.info('git status (get current branch name)');
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git status`);
      const process = exec('git status', {
        cwd: this.configuration.getCwd(),
      });

      let outputData = '';

      process.stderr.on('data', (data : any) => {
        this.logger.debug(data);
      });

      process.stdout.on('data', (data : any) => {
        this.logger.debug(data);
        outputData += data;
      });

      process.on('close', (retCode : number) => {
        resolve(GitDriver.extractBranchName(outputData));
      });
    });
  }

  pushBranch(branchName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.info(`git push current branch (${branchName})`);
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git push origin ${branchName}`);
      const process = exec(`git push origin ${branchName}`, {
        cwd: this.configuration.getCwd(),
      });

      let outputData = '';

      process.stderr.on('data', (data : any) => {
        this.logger.debug(data);
      });

      process.stdout.on('data', (data : any) => {
        this.logger.debug(data);
        outputData += data;
      });

      process.on('close', (retCode : number) => {
        if (retCode !== 0) {
          throw new Error('git push return code is not 0');
        }

        resolve(true);
      });
    });
  }

  fetchAll(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.info('git fetch all changes');
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git fetch --all`);
      const process = exec('git fetch --all', {
        cwd: this.configuration.getCwd(),
      });

      let outputData = '';

      process.stderr.on('data', (data : any) => {
        this.logger.debug(data);
      });

      process.stdout.on('data', (data : any) => {
        this.logger.debug(data);
        outputData += data;
      });

      process.on('close', (retCode : number) => {
        if (retCode !== 0) {
          throw new Error('git fetch --all return code is not 0');
        }

        resolve(true);
      });
    });
  }

  /** Returns true if the git message contains a track of a conflict * */
  private static hasCherryPickConflict(gitMessage : string) : boolean {
    return gitMessage.match('conflict') !== null;
  }

  /** Returns true if the git message contains a track that the commit is already on the branch * */
  private static hasCherryPickNoAction(gitMessage : string) : boolean {
    return gitMessage.match('allow-empty') !== null;
  }

  /** Returns true if there is no mere, rebase or cherry-pick ongoing * */
  private static isStatusOk(gitMessage : string) : boolean {
    return gitMessage.match('Unmerged paths') === null
        && gitMessage.match('fix conflicts') === null
        && gitMessage.match('git cherry-pick --continue') === null
        && gitMessage.match('git merge --continue') === null
        && gitMessage.match('git rebase --continue') === null;
  }

  private static extractBranchName(gitMessage: string): string {
    const branchNameLine = gitMessage.split('\n').filter((line: string) => line.match('On branch') !== null);

    return branchNameLine[0].split(' ')[2];
  }
}
