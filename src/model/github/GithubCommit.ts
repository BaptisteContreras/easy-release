import AbstractCommit from '../common/AbstractCommit';
import GithubUser from './GithubUser';

export default class GithubCommit extends AbstractCommit {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    sha: string, message: string, nodeId: string,
    author: GithubUser, committer: GithubUser,
  ) {
    super(sha, message, nodeId, author, committer);
  }
}
