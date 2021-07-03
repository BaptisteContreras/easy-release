import GithubVcsDriver from '../../utils/driver/vcs/GithubVcsDriver';
import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import GithubApiLibFactory from '../lib/GithubApiLibFactory';
import LoggerInterface from '../../utils/logger/LoggerInterface';

export default class VcsDriverFactory {
  /**            Properties           * */

  private vcsConfiguration : AbstractVcsConfiguration;

  private readonly logger : LoggerInterface;

  /**            Constructor           * */

  constructor(vcsConfiguration: AbstractVcsConfiguration, logger : LoggerInterface) {
    this.vcsConfiguration = vcsConfiguration;
    this.logger = logger;
  }

  /**            Methods           * */

  createVcsGithubDriver() : GithubVcsDriver {
    return new GithubVcsDriver(
      GithubApiLibFactory.createGithubApiLib(this.vcsConfiguration.getApiToken()),
      this.vcsConfiguration.getRepositoryName(),
      this.vcsConfiguration.getOrganisationName(),
      this.logger,
    );
  }
}
