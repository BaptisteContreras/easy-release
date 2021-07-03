import AbstractVcsRepository from './AbstractVcsRepository';
import GithubVcsDriver from '../driver/vcs/GithubVcsDriver';
import VcsEnum from '../../model/enum/VcsEnum';
import LoggerInterface from '../logger/LoggerInterface';

export default class GithubRepository extends AbstractVcsRepository {
  constructor(vcsDriver: GithubVcsDriver, logger : LoggerInterface) {
    super(VcsEnum.GITHUB, vcsDriver, logger);
    this.logger.info('GithubRepository created');
  }
}
