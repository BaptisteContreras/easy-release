import EasyReleasePackager from '../EasyReleasePackager';
import Configuration from '../model/configuration/Configuration';
import RepositoryFactory from './repository/RepositoryFactory';
import LoggerInterface from '../utils/logger/LoggerInterface';

export default class MainFactory {
  public static createApplication(
    configuration : Configuration, logger : LoggerInterface,
  ) : EasyReleasePackager {
    // TODO select repository depending on configuration

    return new EasyReleasePackager(
      (new RepositoryFactory(configuration.getVcsConfiguration(), logger)).createGithubRepository(),
      configuration,
      logger,
    );
  }
}
