import GithubLabel from './GitlabLabel';
import GitlabOwner from './GitlabOwner';
import AbstractIssue from '../common/AbstractIssue';

export default class GitlabIssue extends AbstractIssue {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(name: String, url: String, labels: GithubLabel[], owner : GitlabOwner) {
    super(name, url, labels, owner);
  }
}
