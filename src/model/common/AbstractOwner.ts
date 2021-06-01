export default abstract class AbstractOwner {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  /**            Constructor           * */

  constructor(name: String, url: String) {
    this.name = name;
    this.url = url;
  }

  /**            Accessors           * */

  protected getName(): String {
    return this.name;
  }

  protected getUrl(): String {
    return this.name;
  }
}
