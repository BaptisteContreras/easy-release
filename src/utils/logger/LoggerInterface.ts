/** Logger interface base on PSR (https://www.php-fig.org/psr/psr-3)  * */
export default interface LoggerInterface {
  /** System is unusable. * */
  emergency(message: string, code?: string, context?: []) : void;

  /** Action must be taken immediately. * */
  alert(message: string, code?: string, context?: []) : void;

  /** Critical conditions. * */
  critical(message: string, code?: string, context?: []) : void;

  /** Runtime errors that do not require immediate action but should typically
   * be logged and monitored. * */
  error(message: string, code?: string, context?: []) : void;

  /** Exceptional occurrences that are not errors. * */
  warning(message: string, code?: string, context?: []) : void;

  /** Normal but significant events. * */
  notice(message: string, code?: string, context?: []) : void;

  /** Detailed debug information. * */
  info(message: string, code?: string, context?: []) : void;

  /** Interesting events. * */
  debug(message: string, code?: string, context?: []) : void;

}
