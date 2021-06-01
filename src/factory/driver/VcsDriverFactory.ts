import GithubVcsDriver from '../../tools/driver/vcs/GithubVcsDriver';
import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import GithubApiLibFactory from '../lib/GithubApiLibFactory';

export default class VcsDriverFactory {
  /**            Properties           * */

  private vcsConfiguration : AbstractVcsConfiguration;

  /**            Constructor           * */

  constructor(vcsConfiguration: AbstractVcsConfiguration) {
    this.vcsConfiguration = vcsConfiguration;
  }

  /**            Methods           * */

  createVcsGithubDriver() : GithubVcsDriver {
    return new GithubVcsDriver(
      GithubApiLibFactory.createGithubApiLib(this.vcsConfiguration.getApiToken()),
      this.vcsConfiguration.getRepositoryName(),
      this.vcsConfiguration.getOrganisationName(),
    );
  }
}
