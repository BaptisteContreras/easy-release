import { sha512 } from 'js-sha512';
import LoggerInterface from '../../logger/LoggerInterface';

export default class ReleaseBuilderContainer {
  /**            Properties           * */

  private container : Map<String, Map<String, any>>;

  private refreshCallbackCollection : Map<String, (rawData: any) => object>;

  private logger: LoggerInterface;

  /**            Constructor           * */
  constructor(logger: LoggerInterface) {
    this.container = new Map<String, Map<String, object>>();

    this.refreshCallbackCollection = new Map<String, (rawData: any) => object>();
    this.logger = logger;
  }

  /**            Methods           * */
  public getOrAdd<T>(elementClass: string, rawData: any): T {
    const elementId = sha512(JSON.stringify(rawData));
    this.logger.debug(`Element ID ${elementId}`);

    let classContainer = this.container.get(elementClass);

    if (!classContainer) {
      this.logger.debug(`ClassContainer not found for ${elementClass}`);

      classContainer = new Map<String, T>();
      this.container.set(elementClass, classContainer);
    }

    let element = classContainer.get(elementId);

    if (!element) {
      this.logger.debug(`Element with ID: ${elementId} not found in ${elementClass} container`);
      element = this.refreshElement(rawData, elementClass);

      classContainer.set(elementId, element);
    } else {
      this.logger.debug(`Element with ID: ${elementId} found in ${elementClass} container`);
    }

    return element;
  }

  public registerClassCallback(className: string, refreshCallback: (rawData: any) => object): void {
    if (!this.refreshCallbackCollection.get(className)) {
      this.refreshCallbackCollection.set(className, refreshCallback);
    }
  }

  public debug(): void {
    console.log(this.container);
  }

  private refreshElement(rawData: any, className: string): object {
    const refreshCallback = this.refreshCallbackCollection.get(className);

    if (!refreshCallback) {
      throw new Error(`ReleaseBuilderContainer: Cannot find the refresh callback for ${className} class`);
    }

    return refreshCallback(rawData);
  }
}
