import AbstractUser from '../common/AbstractUser';
import InternalType from '../enum/InternalType';

export default class GitlabUser extends AbstractUser {
  constructor(name: String, url: String, id: number) {
    super(name, url, id);
    this.internalType = InternalType.GITLAB_USER;
  }
}
