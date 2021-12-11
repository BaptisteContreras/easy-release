export default abstract class AbstractUser {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected id: number;

  protected internalType : string;

  /**            Constructor           * */
  constructor(name: String, url: String, id: number) {
    this.name = name;
    this.url = url;
    this.id = id;
    this.internalType = '';
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

  getInternalType(): string {
    return this.internalType;
  }
}
