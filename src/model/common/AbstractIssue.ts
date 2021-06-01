import AbstractLabel from './AbstractLabel';
import AbstractOwner from './AbstractOwner';

export default abstract class AbstractIssue {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected labels: AbstractLabel[];

  protected owner : AbstractOwner;
  /**            Constructor           * */

  protected constructor(name: String, url: String, labels: AbstractLabel[], owner : AbstractOwner) {
    this.name = name;
    this.url = url;
    this.labels = labels;
    this.owner = owner;
  }

  /**            Accessors           * */

  protected getName(): String {
    return this.name;
  }

  protected getUrl(): String {
    return this.name;
  }

  protected getLabels(): AbstractLabel[] {
    return this.labels;
  }

  protected getOwner(): AbstractOwner {
    return this.owner;
  }
}
