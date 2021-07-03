import GitlabOwner from './GitlabOwner';
import AbstractMergeRequest from '../common/AbstractMergeRequest';
import AbstractIssue from '../common/AbstractIssue';
import GitlabIssue from './GitlabIssue';

export default class MergeRequest extends AbstractMergeRequest {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: String, url: String, owner: GitlabOwner,
    body: string,
    linkedIssueId: string, state: string,
    createdAt: Date, updatedAt: Date | null,
  ) {
    super(
      name, url, owner,
      body, linkedIssueId, state,
      createdAt, updatedAt,
    );
  }

  setLinkedIssue(issue: AbstractIssue) {
    if (issue instanceof GitlabIssue) {
      super.setLinkedIssue(issue);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isOpen(): boolean {
    return false;
  }
}
