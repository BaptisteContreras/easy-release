import GithubOwner from './GithubOwner';
import AbstractLabel from '../common/AbstractLabel';

export default class GithubLabel extends AbstractLabel {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(name: String, url: String) {
    super(name, url);
  }
}
