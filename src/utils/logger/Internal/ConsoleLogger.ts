import AbstractLogger from './AbstractLogger';

const colors = require('colors');

export default class ConsoleLogger extends AbstractLogger {
  private formatter : CallableFunction;

  constructor(profile: string) {
    super(profile);
    this.formatter = (str : string) => str;
  }

  alert(message: string, code?: string, context?: []): void {
    this.formatter = colors.red;
    super.alert(message, code, context);
  }

  critical(message: string, code?: string, context?: []): void {
    this.formatter = colors.red;
    super.critical(message, code, context);
  }

  debug(message: string, code?: string, context?: []): void {
    this.formatter = colors.gray;
    super.debug(message, code, context);
  }

  emergency(message: string, code?: string, context?: []): void {
    this.formatter = colors.red;
    super.emergency(message, code, context);
  }

  error(message: string, code?: string, context?: []): void {
    this.formatter = colors.red;
    super.error(message, code, context);
  }

  info(message: string, code?: string, context?: []): void {
    this.formatter = colors.blue;
    super.info(message, code, context);
  }

  notice(message: string, code?: string, context?: []): void {
    this.formatter = colors.red;
    super.notice(message, code, context);
  }

  warning(message: string, code?: string, context?: []): void {
    this.formatter = colors.yellow;
    super.warning(message, code, context);
  }

  protected handleOutput(output: string): void {
    console.log(this.formatter(output));
  }
}
