import AbstractVcsConfiguration from './AbstractVcsConfiguration';

export default class GithubConfiguration extends AbstractVcsConfiguration {
  private static DEFAULT_GITHUB_BASE_URL = 'https://github.com/';

  constructor(organisationName: string, repositoryName: string, apiToken: string) {
    super(GithubConfiguration.DEFAULT_GITHUB_BASE_URL, organisationName, repositoryName, apiToken);
  }

  public static buildFromParsedConfiguration(parsedConfiguration : object) : GithubConfiguration {
    return new GithubConfiguration('', '', '');
  }
}
