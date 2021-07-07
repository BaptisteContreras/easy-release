import { spawn } from 'child_process';
import LoggerInterface from '../../logger/LoggerInterface';
import Configuration from '../../../model/configuration/Configuration';

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

  /** Create the new release branch in the current git repository * */
  createAndCheckoutToReleaseBranch(
    releaseBranchName : string, baseBranch : string,
  ) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info('create and checkout to release branch');
      this.logger.debug(`GIT : execute "cd ${this.configuration.getCwd()} && git checkout ${baseBranch} && git pull origin ${baseBranch}"`);
      const process = spawn(`git checkout ${baseBranch} && git pull origin ${baseBranch}`, {
        cwd: this.configuration.getCwd(),
      });

      process.on('close', (retCode : number) => {
        console.log(`retCode ${retCode}`);
        if (retCode === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}
