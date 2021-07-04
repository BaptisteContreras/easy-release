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
