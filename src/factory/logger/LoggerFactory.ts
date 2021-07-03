import Configuration from '../../model/configuration/Configuration';
import LoggerInterface from '../../utils/logger/LoggerInterface';
import LoggerDispatcher from '../../utils/logger/LoggerDispatcher';
import ConsoleLogger from '../../utils/logger/Internal/ConsoleLogger';

export default class LoggerFactory {
  public static createLogger(configuration : Configuration) : LoggerInterface {
    const dispatcher = new LoggerDispatcher(configuration.isVerbose());

    // TODO add CLI options to disable console logging
    dispatcher.registerLogger(this.createConsoleLogger(configuration));

    // TODO add File logger

    return dispatcher;
  }

  private static createConsoleLogger(configuration : Configuration) : ConsoleLogger {
    return new ConsoleLogger(configuration.getProfile());
  }
}
