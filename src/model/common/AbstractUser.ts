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

  getName(): String {
    return this.name;
  }

  getUrl(): String {
    return this.name;
  }

  getId(): number {
    return this.id;
  }
}
