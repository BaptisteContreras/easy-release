export default abstract class AbstractLabel {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected id: number;

  protected description: string;

  protected internalType: string;

  /**            Constructor           * */

  constructor(name: String, url: String, id: number, description: string) {
    this.name = name;
    this.url = url;
    this.id = id;
    this.description = description;
    this.internalType = '';
  }

  /**            Accessors           * */

  public getName(): String {
    return this.name;
  }

  public getUrl(): String {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public getDescription(): String {
    return this.description;
  }

  public getInternalType(): string {
    return this.internalType;
  }
}
