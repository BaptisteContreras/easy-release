import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import GithubRepository from '../../tools/repository/GithubRepository';
import VcsDriverFactory from '../driver/VcsDriverFactory';

export default class RepositoryFactory {
  /**            Properties           * */

  private vcsConfiguration : AbstractVcsConfiguration;

  private vcsDriverFactory : VcsDriverFactory;

  /**            Constructor           * */

  constructor(vcsConfiguration: AbstractVcsConfiguration) {
    this.vcsConfiguration = vcsConfiguration;
    this.vcsDriverFactory = new VcsDriverFactory(vcsConfiguration);
  }

  /**            Methods           * */

  createGithubRepository() : GithubRepository {
    return new GithubRepository(this.vcsDriverFactory.createVcsGithubDriver());
  }
}
