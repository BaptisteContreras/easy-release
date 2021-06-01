import GitlabOwner from './GitlabOwner';
import AbstractLabel from '../common/AbstractLabel';

export default class GitlabLabel extends AbstractLabel {
  /**            Constructor           * */

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(name: String, url: String, owner : GitlabOwner) {
    super(name, url, owner);
  }
}
