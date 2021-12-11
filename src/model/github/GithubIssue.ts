import GithubUser from './GithubUser';
import GithubLabel from './GithubLabel';
import AbstractIssue from '../common/AbstractIssue';
import InternalType from '../enum/InternalType';

export default class GithubIssue extends AbstractIssue {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    name: String, url: String, labels: GithubLabel[],
    owner: GithubUser, id: number, number: number,
  ) {
    super(name, url, labels, owner, id, number);
    this.internalType = InternalType.GITHUB_ISSUE;
  }
}
