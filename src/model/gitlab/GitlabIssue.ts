import GitlabUser from './GitlabUser';
import AbstractIssue from '../common/AbstractIssue';
import GitlabLabel from './GitlabLabel';

export default class GitlabIssue extends AbstractIssue {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: String, url: String, labels: GitlabLabel[],
    owner: GitlabUser, id: number, number: number,
  ) {
    super(name, url, labels, owner, id, number);
  }
}
