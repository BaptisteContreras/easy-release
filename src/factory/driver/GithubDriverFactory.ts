import VcsDriverFactory from './VcsDriverFactory';
import AbstractVcsDriver from '../../tools/driver/vcs/AbstractVcsDriver';
import GithubVcsDriver from '../../tools/driver/vcs/GithubVcsDriver';

export default class GithubDriverFactory implements VcsDriverFactory {
  private repositoryName : String;

  private organisationName : String;

  private apiToken : String;

  private libFactory : Gith;

  constructor(repositoryName: String, organisationName: String, apiToken: String) {
    this.repositoryName = repositoryName;
    this.organisationName = organisationName;
    this.apiToken = apiToken;
  }

  createVcsDriver(): AbstractVcsDriver {
    return new GithubVcsDriver();
  }
}
