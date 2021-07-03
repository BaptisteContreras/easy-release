import AbstractOwner from './AbstractOwner';
import AbstractIssue from './AbstractIssue';

export default abstract class AbstractMergeRequest {
  /**            Properties           * */
  protected name: String;

  protected url: String;

  protected owner : AbstractOwner;

  protected body : string;

  protected linkedIssue : AbstractIssue | null;

  protected linkedIssueId : string;

  protected state : string;

  protected createdAt : Date;

  protected updatedAt : Date | null;

  /**            Constructor           * */

  protected constructor(
    name: String, url: String, owner: AbstractOwner,
    body: string, linkedIssueId: string,
    state: string, createdAt: Date, updatedAt: Date | null,
  ) {
    this.name = name;
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

  getName(): String {
    return this.name;
  }

  getUrl(): String {
    return this.name;
  }

  getOwner(): AbstractOwner {
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
