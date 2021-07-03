import AbstractVcsConfiguration from './AbstractVcsConfiguration';
import { RawConfiguration } from './ConfigurationSchema';

export default class Configuration {
  /**            Properties           * */

  private readonly vcsConfiguration : AbstractVcsConfiguration;

  /**            Constructor           * */
  constructor(vcsConfiguration: AbstractVcsConfiguration) {
    this.vcsConfiguration = vcsConfiguration;
  }

  /**            Methods           * */

  public static buildFromParsedConfiguration(
    vcsConfiguration: AbstractVcsConfiguration,
    parsedConfiguration: RawConfiguration,
  ) : Configuration {
    return new Configuration(vcsConfiguration);
  }

  /**            Accessors           * */
  getVcsConfiguration() : AbstractVcsConfiguration {
    return this.vcsConfiguration;
  }
}
