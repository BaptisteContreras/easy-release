export default abstract class AbstractLabel {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected id: number;

  protected description: string;

  /**            Constructor           * */

  constructor(name: String, url: String, id: number, description: string) {
    this.name = name;
    this.url = url;
    this.id = id;
    this.description = description;
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

  protected getDescription(): String {
    return this.description;
  }
}
