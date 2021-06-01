import GitlabOwner from './GitlabOwner';
import AbstractMergeRequest from '../common/AbstractMergeRequest';

export default class MergeRequest extends AbstractMergeRequest {
  /**            Constructor           * */

  protected constructor(name: String, url: String, owner : GitlabOwner) {
    super(name, url, owner);
  }
}
