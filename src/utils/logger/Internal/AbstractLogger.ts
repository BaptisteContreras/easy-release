import LoggerInterface from '../LoggerInterface';

export default abstract class AbstractLogger implements LoggerInterface {
  protected profile : string;

  constructor(profile: string) {
    this.profile = profile;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  alert(message: string, code?: string, context?: []): void {
    this.handleOutput(`ALERT.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  critical(message: string, code?: string, context?: []): void {
    this.handleOutput(`CRITICAL.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(message: string, code?: string, context?: []): void {
    this.handleOutput(`DEBUG.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emergency(message: string, code?: string, context?: []): void {
    this.handleOutput(`EMERGENCY.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(message: string, code?: string, context?: []): void {
    this.handleOutput(`ERROR.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(message: string, code?: string, context?: []): void {
    this.handleOutput(`INFO.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notice(message: string, code?: string, context?: []): void {
    this.handleOutput(`NOTICE.${this.profile} : ${message} [${code || ''}] []`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warning(message: string, code?: string, context?: []): void {
    this.handleOutput(`WARNING.${this.profile} : ${message} [${code || ''}] []`);
  }

  /** Sub classes must define how to handle the formatted output
   * For example, the output can be written in a file * */
  protected abstract handleOutput(output : string) : void;
}
