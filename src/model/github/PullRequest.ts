import GithubUser from './GithubUser';
import AbstractMergeRequest from '../common/AbstractMergeRequest';
import AbstractIssue from '../common/AbstractIssue';
import GithubIssue from './GithubIssue';

export default class PullRequest extends AbstractMergeRequest {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: String, url: String, owner: GithubUser,
    body: string, linkedIssueId: string,
    state: string, createdAt: Date, updatedAt: Date | null,
  ) {
    super(
      name, url, owner,
      body, linkedIssueId, state,
      createdAt, updatedAt,
    );
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
