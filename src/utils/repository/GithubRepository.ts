import AbstractVcsRepository from './AbstractVcsRepository';
import GithubVcsDriver from '../driver/vcs/GithubVcsDriver';

export default class GithubRepository extends AbstractVcsRepository {
  constructor(vcsDriver: GithubVcsDriver) {
    super(VcsEnum.GITHUB, vcsDriver);
  }
}
