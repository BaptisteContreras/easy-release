import AbstractUser from './AbstractUser';
import AbstractIssue from './AbstractIssue';

export default abstract class AbstractMergeRequest {
  /**            Properties           * */
  protected title: String;

  protected url: String;

  protected owner : AbstractUser;

  protected body : string;

  protected linkedIssue : AbstractIssue | null;

  protected linkedIssueId : string;

  protected state : string;

  protected createdAt : Date;

  protected updatedAt : Date | null;

  /**            Constructor           * */

  protected constructor(
    name: String, url: String, owner: AbstractUser,
    body: string, linkedIssueId: string,
    state: string, createdAt: Date, updatedAt: Date | null,
  ) {
    this.title = name;
    this.url = url;
    this.owner = owner;
    this.body = body;
    this.linkedIssueId = linkedIssueId;
    this.state = state;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.linkedIssue = null;
  }

  /**            Accessors           * */

  getTitle(): String {
    return this.title;
  }

  getUrl(): String {
    return this.title;
  }

  getOwner(): AbstractUser {
    return this.owner;
  }

  getBody(): string {
    return this.body;
  }

  getLinkedIssueId(): string {
    return this.linkedIssueId;
  }

  getState(): string {
    return this.state;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  getLinkedIssue(): AbstractIssue | null {
    return this.linkedIssue;
  }

  setLinkedIssue(issue : AbstractIssue) : void {
    this.linkedIssue = issue;
  }

  public abstract isOpen() : boolean;
}
