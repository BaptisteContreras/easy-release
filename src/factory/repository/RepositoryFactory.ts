import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import GithubRepository from '../../utils/repository/GithubRepository';
import LoggerInterface from '../../utils/logger/LoggerInterface';
import VcsPlatformDriverFactory from '../driver/VcsPlatformDriverFactory';

export default class RepositoryFactory {
  /**            Properties           * */

  private vcsConfiguration : AbstractVcsConfiguration;

  private vcsDriverFactory : VcsPlatformDriverFactory;

  private readonly logger : LoggerInterface;

  /**            Constructor           * */

  constructor(vcsConfiguration: AbstractVcsConfiguration, logger : LoggerInterface) {
    this.vcsConfiguration = vcsConfiguration;
    this.vcsDriverFactory = new VcsPlatformDriverFactory(vcsConfiguration, logger);
    this.logger = logger;
  }

  /**            Methods           * */

  createGithubRepository() : GithubRepository {
    return new GithubRepository(this.vcsDriverFactory.createVcsGithubDriver(), this.logger);
  }
}
