import AbstractCommit from '../common/AbstractCommit';
import GitlabUser from './GitlabUser';
import InternalType from '../enum/InternalType';

export default class GitlabCommit extends AbstractCommit {
// eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    sha: string, message: string, nodeId: string,
    author: GitlabUser, committer: GitlabUser,
  ) {
    super(sha, message, nodeId, author, committer);
    this.internalType = InternalType.GITLAB_COMMIT;
  }
}
