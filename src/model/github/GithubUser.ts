import AbstractUser from '../common/AbstractUser';
import InternalType from '../enum/InternalType';

export default class GithubUser extends AbstractUser {
  constructor(name: String, url: String, id: number) {
    super(name, url, id);
    this.internalType = InternalType.GITHUB_USER;
  }
}
