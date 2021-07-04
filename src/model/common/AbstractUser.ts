export default abstract class AbstractUser {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected id: number;

  /**            Constructor           * */
  constructor(name: String, url: String, id: number) {
    this.name = name;
    this.url = url;
    this.id = id;
  }

  /**            Accessors           * */

  protected getName(): String {
    return this.name;
  }

  protected getUrl(): String {
    return this.name;
  }

  protected getId(): number {
    return this.id;
  }
}
