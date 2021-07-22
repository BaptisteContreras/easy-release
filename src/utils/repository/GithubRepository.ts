import AbstractVcsRepository from './AbstractVcsRepository';
import VcsEnum from '../../model/enum/VcsEnum';
import LoggerInterface from '../logger/LoggerInterface';
import GithubOctokitDriver from '../driver/vcs/GithubOctokitDriver';

export default class GithubRepository extends AbstractVcsRepository {
  constructor(vcsDriver: GithubOctokitDriver, logger : LoggerInterface) {
    super(VcsEnum.GITHUB, vcsDriver, logger);
    this.logger.info('GithubRepository created');
  }
}
