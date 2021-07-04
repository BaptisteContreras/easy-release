import { release } from 'os';
import AbstractVcsRepository from './utils/repository/AbstractVcsRepository';
import Configuration from './model/configuration/Configuration';
import LoggerInterface from './utils/logger/LoggerInterface';

export default class EasyReleasePackager {
  /**            Properties           * */

  private repository : AbstractVcsRepository;

  private configuration : Configuration;

  private logger : LoggerInterface;

  constructor(
    repository : AbstractVcsRepository, configuration : Configuration, logger : LoggerInterface,
  ) {
    this.repository = repository;
    this.configuration = configuration;
    this.logger = logger;

    this.logger.info('EasyReleasePackager application created !');
  }

  // eslint-disable-next-line class-methods-use-this
  async startPackage() : Promise<void> {
    this.logger.info('Fetch MR to deliver');
    const mrToDeliver = await this.repository.getMrToDeliver(this.configuration.getLabelsDeliver());
    this.logger.info(`${mrToDeliver.length} MR to deliver found`);

    console.log('MR to deliver');
    console.log(mrToDeliver);
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
}
