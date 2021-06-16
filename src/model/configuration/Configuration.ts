import AbstractVcsConfiguration from './AbstractVcsConfiguration';

export default class Configuration {
  /**            Properties           * */

  private readonly vcsConfiguration : AbstractVcsConfiguration;

  /**            Constructor           * */
  constructor(vcsConfiguration: AbstractVcsConfiguration) {
    this.vcsConfiguration = vcsConfiguration;
  }

  /**            Methods           * */

  public static buildFromParsedConfiguration(
    vcsConfiguration: AbstractVcsConfiguration, parsedConfiguration : object,
  ) : Configuration {
    return new Configuration(vcsConfiguration);
  }

  /**            Accessors           * */
  getVcsConfiguration() : AbstractVcsConfiguration {
    return this.vcsConfiguration;
  }
}
