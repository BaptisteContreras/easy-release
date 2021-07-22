import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import LoggerInterface from '../../utils/logger/LoggerInterface';
import OctokitLibFactory from '../lib/OctokitLibFactory';
import GithubOctokitDriver from '../../utils/driver/vcs/GithubOctokitDriver';

export default class VcsPlatformDriverFactory {
  /**            Properties           * */

  private vcsConfiguration : AbstractVcsConfiguration;

  private readonly logger : LoggerInterface;

  /**            Constructor           * */

  constructor(vcsConfiguration: AbstractVcsConfiguration, logger : LoggerInterface) {
    this.vcsConfiguration = vcsConfiguration;
    this.logger = logger;
  }

  /**            Methods           * */

  createVcsGithubDriver() : GithubOctokitDriver {
    return new GithubOctokitDriver(
      OctokitLibFactory.createOctokitClient(this.vcsConfiguration.getApiToken()),
      this.vcsConfiguration.getRepositoryName(),
      this.vcsConfiguration.getOrganisationName(),
      this.logger,
    );
  }
}
