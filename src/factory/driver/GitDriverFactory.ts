import GitDriver from '../../utils/driver/git/GitDriver';
import Configuration from '../../model/configuration/Configuration';
import LoggerInterface from '../../utils/logger/LoggerInterface';

export default class GitDriverFactory {
  public static createDriver(logger : LoggerInterface, configuration : Configuration) : GitDriver {
    return new GitDriver(logger, configuration);
  }
}
