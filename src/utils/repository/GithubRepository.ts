import AbstractVcsRepository from './AbstractVcsRepository';
import GithubVcsDriver from '../driver/vcs/GithubVcsDriver';
import VcsEnum from '../../model/enum/VcsEnum';

export default class GithubRepository extends AbstractVcsRepository {
  constructor(vcsDriver: GithubVcsDriver) {
    super(VcsEnum.GITHUB, vcsDriver);
  }
}
