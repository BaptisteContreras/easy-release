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

  private labelsDeliver : string[];

  private release : boolean;

  private resume : boolean;

  /**            Constructor           * */
  constructor(vcsConfiguration: AbstractVcsConfiguration, labelsDeliver : string[]) {
    this.vcsConfiguration = vcsConfiguration;
    this.verbose = false;
    this.currentWorkDirectory = '.';
    this.configurationFilePath = '.';
    this.labelsDeliver = labelsDeliver;
    this.profile = 'recette';
    this.release = false;
    this.resume = false;
  }

  /**            Methods           * */

  public static buildFromParsedConfiguration(
    vcsConfiguration: AbstractVcsConfiguration,
    parsedConfiguration: RawConfiguration,
  ) : Configuration {
    return new Configuration(vcsConfiguration, parsedConfiguration.LABELS_DELIVER_NAME);
  }

  /** Merge the CLI option with the parsed application's configuration * */
  public mergeCliOptions(cliOptions : CliOptions) : Configuration {
    this.verbose = cliOptions.verbose;
    this.currentWorkDirectory = cliOptions.currentWorkDirectory;
    this.configurationFilePath = cliOptions.configurationFilePath;
    this.profile = cliOptions.profile;
    this.resume = cliOptions.resume;
    this.release = cliOptions.release;

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

  getLabelsDeliver() : string[] {
    return this.labelsDeliver;
  }

  isRelease() : boolean {
    return this.release;
  }

  isResume() : boolean {
    return this.resume;
  }
}
