import GithubUser from './GithubUser';
import AbstractMergeRequest from '../common/AbstractMergeRequest';
import AbstractIssue from '../common/AbstractIssue';
import GithubIssue from './GithubIssue';
import InternalType from '../enum/InternalType';

export default class PullRequest extends AbstractMergeRequest {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: String, url: String, owner: GithubUser,
    body: string, linkedIssueId: string, state: string,
    createdAt: Date, updatedAt: Date | null, number : number,
  ) {
    super(
      name, url, owner,
      body, linkedIssueId, state,
      createdAt, updatedAt, number,
    );

    this.internalType = InternalType.PULL_REQUEST;
  }

  setLinkedIssue(issue: AbstractIssue) {
    if (issue instanceof GithubIssue) {
      super.setLinkedIssue(issue);
    }
  }

  isOpen(): boolean {
    return this.getState() === 'open';
  }
}
