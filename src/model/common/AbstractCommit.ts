import AbstractUser from './AbstractUser';
import MergeableElement from '../../utils/merge/MergeableElement';

export default abstract class AbstractCommit implements MergeableElement {
  /**            Properties           * */
  protected sha: string;

  protected message: string;

  protected nodeId: string;

  protected author: AbstractUser;

  protected committer: AbstractUser;

  protected merged: boolean;

  protected conflict : boolean;

  /**            Constructor           * */

  constructor(
    sha: string, message: string, nodeId: string,
    author: AbstractUser, committer: AbstractUser,
  ) {
    this.sha = sha;
    this.message = message;
    this.nodeId = nodeId;
    this.author = author;
    this.committer = committer;
    this.merged = false;
    this.conflict = false;
  }

  /**            Accessors           * */

  getSha() : string {
    return this.sha;
  }

  getMessage() : string {
    return this.message;
  }

  getNodeId() : string {
    return this.nodeId;
  }

  getAuthor() : AbstractUser {
    return this.author;
  }

  getCommitter() : AbstractUser {
    return this.committer;
  }

  getMergeIdentifier(): string {
    return this.getSha();
  }

  hasBeenMerged() : boolean {
    return this.merged;
  }

  hasConflict() : boolean {
    return this.conflict;
  }

  setMerged(merged : boolean) : void {
    this.merged = merged;
  }

  setConflict(conflict : boolean) : void {
    this.conflict = conflict;
  }
}
