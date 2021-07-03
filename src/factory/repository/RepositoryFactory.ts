import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import GithubRepository from '../../utils/repository/GithubRepository';
import VcsDriverFactory from '../driver/VcsDriverFactory';
import LoggerInterface from '../../utils/logger/LoggerInterface';

export default class RepositoryFactory {
  /**            Properties           * */

  private vcsConfiguration : AbstractVcsConfiguration;

  private vcsDriverFactory : VcsDriverFactory;

  private readonly logger : LoggerInterface;

  /**            Constructor           * */

  constructor(vcsConfiguration: AbstractVcsConfiguration, logger : LoggerInterface) {
    this.vcsConfiguration = vcsConfiguration;
    this.vcsDriverFactory = new VcsDriverFactory(vcsConfiguration, logger);
    this.logger = logger;
  }

  /**            Methods           * */

  createGithubRepository() : GithubRepository {
    return new GithubRepository(this.vcsDriverFactory.createVcsGithubDriver(), this.logger);
  }
}
