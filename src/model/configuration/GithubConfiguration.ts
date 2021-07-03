import AbstractVcsConfiguration from './AbstractVcsConfiguration';
import { RawConfiguration } from './ConfigurationSchema';

export default class GithubConfiguration extends AbstractVcsConfiguration {
  private static DEFAULT_GITHUB_BASE_URL = 'https://github.com/';

  constructor(organisationName: string, repositoryName: string, apiToken: string) {
    super(GithubConfiguration.DEFAULT_GITHUB_BASE_URL, organisationName, repositoryName, apiToken);
  }

  public static buildFromParsedConfiguration(
    parsedConfiguration : RawConfiguration,
  ) : GithubConfiguration {
    return new GithubConfiguration(
      parsedConfiguration.ORGANISATION_NAME,
      parsedConfiguration.REPOSITORY_NAME,
      parsedConfiguration.API_TOKEN,
    );
  }
}
