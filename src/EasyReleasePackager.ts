import AbstractVcsRepository from './utils/repository/AbstractVcsRepository';
import Configuration from './model/configuration/Configuration';

export default class EasyReleasePackager {
  /**            Properties           * */

  private repository : AbstractVcsRepository;

  private configuration : Configuration;

  private commandLineOptions : object;

  private currentWorkDirectory : string;

  constructor(
    repository : AbstractVcsRepository, configuration : Configuration, commandLineOptions : object,
  ) {
    this.repository = repository;
    this.configuration = configuration;
    this.commandLineOptions = commandLineOptions;
    this.currentWorkDirectory = '';

    this.configure();
  }

  // eslint-disable-next-line class-methods-use-this
  configure() : void {
    // this.currentWorkDirectory = this.commandLineOptions.currentWorkDirectory ?? '.';
  }

  // eslint-disable-next-line class-methods-use-this
  startPackage() : void {

  }

  // eslint-disable-next-line class-methods-use-this
  resumePackage() : void {

  }
}
