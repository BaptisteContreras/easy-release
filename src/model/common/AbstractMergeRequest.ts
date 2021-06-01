import AbstractOwner from './AbstractOwner';

export default abstract class AbstractMergeRequest {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected owner : AbstractOwner;

  /**            Constructor           * */

  protected constructor(name: String, url: String, owner : AbstractOwner) {
    this.name = name;
    this.url = url;
    this.owner = owner;
  }

  /**            Accessors           * */

  protected getName(): String {
    return this.name;
  }

  protected getUrl(): String {
    return this.name;
  }

  protected getOwner(): AbstractOwner {
    return this.owner;
  }
}
