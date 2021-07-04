import AbstractLabel from './AbstractLabel';
import AbstractUser from './AbstractUser';

export default abstract class AbstractIssue {
  /**            Properties           * */
  protected title: String;

  protected url: String;

  protected labels: AbstractLabel[];

  protected owner : AbstractUser;

  protected id: number;

  protected number: number;

  /**            Constructor           * */

  protected constructor(
    name: String, url: String, labels: AbstractLabel[],
    owner: AbstractUser, id: number, number: number,
  ) {
    this.title = name;
    this.url = url;
    this.labels = labels;
    this.owner = owner;
    this.id = id;
    this.number = number;
  }

  /**            Methods           * */

  /** Return true if the issue has the given label (search by label name) * */
  hasLabel(labelName : string) : boolean {
    return this.labels.find((label) => label.getName() === labelName) !== undefined;
  }

  /** Return true if the issue has at least, one label in the given list * */
  hasAtLeastOneLabel(labelsName : string[]) : boolean {
    // eslint-disable-next-line no-restricted-syntax
    for (const labelKey of labelsName) {
      if (this.hasLabel(labelKey)) {
        return true;
      }
    }

    return false;
  }

  /**            Accessors           * */

  public getName(): String {
    return this.title;
  }

  public getUrl(): String {
    return this.title;
  }

  public getLabels(): AbstractLabel[] {
    return this.labels;
  }

  public getOwner(): AbstractUser {
    return this.owner;
  }

  public getId(): number {
    return this.id;
  }

  public getNumber(): number {
    return this.number;
  }
}
