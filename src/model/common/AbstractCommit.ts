import AbstractUser from './AbstractUser';

export default abstract class AbstractCommit {
  /**            Properties           * */
  protected sha: string;

  protected message: string;

  protected nodeId: string;

  protected author: AbstractUser;

  protected committer: AbstractUser;

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
}
