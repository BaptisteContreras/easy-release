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
  startPackage() : void {

  }

  // eslint-disable-next-line class-methods-use-this
  resumePackage() : void {

  }

  async run() : Promise<void> {
    this.logger.info('EasyReleasePackager run');
    this.logger.info('Fetch MR to deliver');
    const mrToDeliver = await this.repository.getMrToDeliver(this.configuration.getLabelsDeliver());
    this.logger.info(`${mrToDeliver.length} MR to deliver found`);

    console.log('MR to deliver');
    console.log(mrToDeliver);
  }
}
