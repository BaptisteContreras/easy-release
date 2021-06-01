export default abstract class AbstractVcsConfiguration {
  /**            Properties           * */

  protected baseUrl: string;

  protected organisationName: string;

  protected repositoryName : string;

  protected apiToken: string;

  /**            Constructor           * */

  constructor(
    baseUrl: string, organisationName: string, repositoryName: string, apiToken: string,
  ) {
    this.baseUrl = baseUrl;
    this.organisationName = organisationName;
    this.repositoryName = repositoryName;
    this.apiToken = apiToken;
  }

  /**            Accessors           * */

  public getBaseUrl() : string {
    return this.baseUrl;
  }

  public getOrganisationName() : string {
    return this.organisationName;
  }

  public getRepositoryName() : string {
    return this.repositoryName;
  }

  public getApiToken() : string {
    const toReturn = this.apiToken;
    if (this.apiToken !== '') {
      this.apiToken = '';
    }

    return toReturn;
  }
}
