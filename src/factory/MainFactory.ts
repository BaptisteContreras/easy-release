import EasyReleasePackager from '../EasyReleasePackager';
import Configuration from '../model/configuration/Configuration';
import RepositoryFactory from './repository/RepositoryFactory';
import LoggerInterface from '../utils/logger/LoggerInterface';
import DisplayerFactory from './display/DisplayerFactory';
import UserInteractionHandlerFactory from './interaction/UserInteractionHandlerFactory';
import GitDriver from '../utils/driver/git/GitDriver';
import GitDriverFactory from './driver/GitDriverFactory';
import MergeHandlerFactory from './merge/MergeHandlerFactory';
import ReleaseStorageHandlerFactory from './release/ReleaseStorageHandlerFactory';

export default class MainFactory {
  public static createApplication(
    configuration : Configuration, logger : LoggerInterface,
  ) : EasyReleasePackager {
    // TODO select repository depending on configuration

    const gitDriver = GitDriverFactory.createDriver(logger, configuration);
    return new EasyReleasePackager(
      (new RepositoryFactory(configuration.getVcsConfiguration(), logger)).createGithubRepository(),
      configuration,
      logger,
      DisplayerFactory.createTerminalKitDisplayer(),
      UserInteractionHandlerFactory.createTkInteractionHandler(),
      gitDriver,
      (new MergeHandlerFactory(logger, gitDriver)).createMergeHandler(),
      ReleaseStorageHandlerFactory.createJsonReleaseStorageHandler(configuration, logger),
    );
  }
}
