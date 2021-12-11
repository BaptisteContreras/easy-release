import AbstractLabel from '../common/AbstractLabel';
import InternalType from '../enum/InternalType';

export default class GithubLabel extends AbstractLabel {
  constructor(name: String, url: String, id: number, description: string) {
    super(name, url, id, description);
    this.internalType = InternalType.GITHUB_LABEL;
  }
}
