import EasyReleasePackager from '../EasyReleasePackager';
import Configuration from '../model/configuration/Configuration';
import RepositoryFactory from './repository/RepositoryFactory';

export default class MainFactory {
  public static createApplication(
    configuration : Configuration, commandLineOptions : object,
  ) : EasyReleasePackager {
    // TODO select repository depending on configuration

    return new EasyReleasePackager(
      (new RepositoryFactory(configuration.getVcsConfiguration())).createGithubRepository(),
      configuration,
      commandLineOptions,
    );
  }
}
