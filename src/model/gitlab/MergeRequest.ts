import GitlabUser from './GitlabUser';
import AbstractMergeRequest from '../common/AbstractMergeRequest';
import AbstractIssue from '../common/AbstractIssue';
import GitlabIssue from './GitlabIssue';
import InternalType from '../enum/InternalType';

export default class MergeRequest extends AbstractMergeRequest {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: String, url: String, owner: GitlabUser,
    body: string, linkedIssueId: string, state: string,
    createdAt: Date, updatedAt: Date | null, number : number,
  ) {
    super(
      name, url, owner,
      body, linkedIssueId, state,
      createdAt, updatedAt, number,
    );
    this.internalType = InternalType.MERGE_REQUEST;
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
