import AbstractVcsConfiguration from './AbstractVcsConfiguration';
import { RawConfiguration } from './ConfigurationSchema';
import { CliOptions } from '../options/OptionsDefinition';

export default class Configuration {
  /**            Properties           * */

  private readonly vcsConfiguration : AbstractVcsConfiguration;

  private verbose : boolean;

  private currentWorkDirectory : string;

  private configurationFilePath : string;

  private profile : string;

  /**            Constructor           * */
  constructor(vcsConfiguration: AbstractVcsConfiguration) {
    this.vcsConfiguration = vcsConfiguration;
    this.verbose = false;
    this.currentWorkDirectory = '.';
    this.configurationFilePath = '.';
    this.profile = 'recette';
  }

  /**            Methods           * */

  public static buildFromParsedConfiguration(
    vcsConfiguration: AbstractVcsConfiguration,
    parsedConfiguration: RawConfiguration,
  ) : Configuration {
    return new Configuration(vcsConfiguration);
  }

  /** Merge the CLI option with the parsed application's configuration * */
  public mergeCliOptions(cliOptions : CliOptions) : Configuration {
    this.verbose = cliOptions.verbose;
    this.currentWorkDirectory = cliOptions.currentWorkDirectory;
    this.configurationFilePath = cliOptions.configurationFilePath;
    this.profile = cliOptions.profile;

    return this;
  }

  /**            Accessors           * */
  getVcsConfiguration() : AbstractVcsConfiguration {
    return this.vcsConfiguration;
  }

  isVerbose() : boolean {
    return this.verbose;
  }

  getProfile() : string {
    return this.profile;
  }
}
