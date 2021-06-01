import GithubOwner from './GithubOwner';
import GithubLabel from './GithubLabel';
import AbstractIssue from '../common/AbstractIssue';

export default class GithubIssue extends AbstractIssue {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(name: String, url: String, labels: GithubLabel[], owner : GithubOwner) {
    super(name, url, labels, owner);
  }
}
