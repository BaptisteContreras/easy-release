import LoggerInterface from './LoggerInterface';

export default class LoggerDispatcher implements LoggerInterface {
  private loggers : LoggerInterface[];

  private readonly verbose : boolean;

  constructor(verbose : boolean) {
    this.loggers = [];
    this.verbose = verbose;
  }

  /** Register a new logger into the dispatcher * */
  registerLogger(logger : LoggerInterface) : LoggerDispatcher {
    this.loggers.push(logger);

    return this;
  }

  alert(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.alert(message, code, context);
    });
  }

  critical(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.critical(message, code, context);
    });
  }

  debug(message: string, code?: string, context?: []): void {
    if (this.verbose) {
      this.loggers.forEach((logger) => {
        logger.debug(message, code, context);
      });
    }
  }

  emergency(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.emergency(message, code, context);
    });
  }

  error(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.error(message, code, context);
    });
  }

  info(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.info(message, code, context);
    });
  }

  notice(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.notice(message, code, context);
    });
  }

  warning(message: string, code?: string, context?: []): void {
    this.loggers.forEach((logger) => {
      logger.warning(message, code, context);
    });
  }
}
