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

  run() : void {
    this.logger.info('EasyReleasePackager run');
  }
}
