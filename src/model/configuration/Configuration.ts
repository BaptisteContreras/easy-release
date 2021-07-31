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

  private releaseBranchName : string;

  private baseReleaseBranch : string;

  private mergeStrategy : string;

  private easyreleaseDirName : string;

  /**            Constructor           * */
  constructor(
    vcsConfiguration: AbstractVcsConfiguration, labelsDeliver : string[],
    releaseBranchName : string, baseReleaseBranch : string,
    mergeStrategy : string, easyreleaseDirName : string,
  ) {
    this.vcsConfiguration = vcsConfiguration;
    this.verbose = false;
    this.currentWorkDirectory = '.';
    this.configurationFilePath = '.';
    this.labelsDeliver = labelsDeliver;
    this.profile = 'recette';
    this.release = false;
    this.resume = false;
    this.releaseBranchName = releaseBranchName;
    this.baseReleaseBranch = baseReleaseBranch;
    this.mergeStrategy = mergeStrategy;
    this.easyreleaseDirName = easyreleaseDirName;
  }

  /**            Methods           * */

  public static buildFromParsedConfiguration(
    vcsConfiguration: AbstractVcsConfiguration,
    parsedConfiguration: RawConfiguration,
  ) : Configuration {
    return new Configuration(
      vcsConfiguration, parsedConfiguration.LABELS_DELIVER_NAME,
      parsedConfiguration.RELEASE_BRANCH_NAME, parsedConfiguration.BASE_RELEASE_BRANCH,
      parsedConfiguration.MERGE_STRATEGY,
      parsedConfiguration.EASYRELEASE_DIR_NAME ? parsedConfiguration.EASYRELEASE_DIR_NAME : '.easyrelease',
    );
  }

  /** Merge the CLI option with the parsed application's configuration * */
  public mergeCliOptions(cliOptions : CliOptions) : Configuration {
    this.verbose = cliOptions.verbose;
    this.currentWorkDirectory = cliOptions.currentWorkDirectory || '.';
    this.configurationFilePath = cliOptions.configurationFilePath || '.';
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

  getReleaseBranchName() : string {
    return this.releaseBranchName;
  }

  getBaseReleaseBranch() : string {
    return this.baseReleaseBranch;
  }

  getCwd() : string {
    return this.currentWorkDirectory;
  }

  getMergeStrategy() : string {
    return this.mergeStrategy;
  }

  getEasyreleaseDirName() : string {
    return this.easyreleaseDirName;
  }
}
