import { Type } from 'class-transformer';
import AbstractUser from './AbstractUser';
import AbstractIssue from './AbstractIssue';
import AbstractCommit from './AbstractCommit';

export default abstract class AbstractMergeRequest {
  /**            Properties           * */
  protected title: String;

  protected url: String;

  @Type(() => AbstractUser)
  protected owner : AbstractUser;

  protected body : string;

  @Type(() => AbstractIssue)
  protected linkedIssue : AbstractIssue | null;

  protected linkedIssueId : string;

  protected state : string;

  protected createdAt : Date;

  protected updatedAt : Date | null;

  protected number : number;

  @Type(() => AbstractCommit)
  protected commits : AbstractCommit[];

  protected internalType : string;

  /**            Constructor           * */

  protected constructor(
    name: String, url: String, owner: AbstractUser,
    body: string, linkedIssueId: string, state: string,
    createdAt: Date, updatedAt: Date | null, number : number,
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
    this.number = number;
    this.commits = [];
    this.commits = [];
    this.internalType = '';
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

  getNumber() : number {
    return this.number;
  }

  getCommits() : AbstractCommit[] {
    return this.commits;
  }

  addCommit(commit : AbstractCommit) : void {
    this.commits.push(commit);
  }

  getInternalType(): string {
    return this.internalType;
  }

  setCommits(commits: AbstractCommit[]): void {
    this.commits = commits;
  }

  setOwner(owner: AbstractUser): void {
    this.owner = owner;
  }

  public abstract isOpen() : boolean;
}
