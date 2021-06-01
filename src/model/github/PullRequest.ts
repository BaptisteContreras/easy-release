import GithubOwner from './GithubOwner';
import AbstractMergeRequest from '../common/AbstractMergeRequest';

export default class PullRequest extends AbstractMergeRequest {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(name: String, url: String, owner : GithubOwner) {
    super(name, url, owner);
  }
}
