import Configuration from '../../model/configuration/Configuration';
import ConfigurationDriver from '../driver/configuration/ConfigurationDriver';
import JsonConfigurationDriver from '../driver/configuration/JsonConfigurationDriver';
import AbstractVcsConfiguration from '../../model/configuration/AbstractVcsConfiguration';
import Vcs from '../../model/enum/Vcs';
import GithubConfiguration from '../../model/configuration/GithubConfiguration';
import ConfigurationValidator from './ConfigurationValidator';
import schemaDeclaration, { RawConfiguration } from '../../model/configuration/ConfigurationSchema';

const fs = require('fs');

export default class ConfigurationReader {
  /**            Properties           * */

  private configurationValidator : ConfigurationValidator;

  /**            Constructor           * */

  constructor(configurationValidator: ConfigurationValidator) {
    this.configurationValidator = configurationValidator;
  }

  /**            Methods           * */

  /** Read a configuration file and create a Configuration for the application * */
  public readConfiguration(
    configurationFilePath : string,
    profile : string,
    baseConfigurationName : string,
    extension : string,
  ) : Configuration {
    const rawConfiguration = ConfigurationReader.configFileLocator(
      configurationFilePath, profile, baseConfigurationName, extension,
    );

    const parsedConfiguration = ConfigurationReader.getDriver(extension)
      .parseConfiguration(rawConfiguration);

    const validationErrors = this.configurationValidator.validateConfiguration(
      schemaDeclaration, parsedConfiguration,

    );

    if (validationErrors.length) {
      throw new Error(`Your configuration contains the following errors : ${validationErrors}`);
    }

    return Configuration.buildFromParsedConfiguration(
      ConfigurationReader.getVcsConfiguration(parsedConfiguration), parsedConfiguration,
    );
  }

  /** Locate and read the configuration file * */
  private static configFileLocator(
    configurationFilePath : string,
    profile : string,
    baseConfigurationName : string,
    extension : string,
  ) : Buffer {
    // TODO handle errors
    return fs.readFileSync(
      ConfigurationReader.buildConfigurationPath(
        configurationFilePath, profile, baseConfigurationName, extension,
      ),
    );
  }

  /** Build the full path of a configuration, given all its components * */
  private static buildConfigurationPath(
    configurationFilePath : string,
    profile : string,
    baseConfigurationName : string,
    extension : string,
  ) : string {
    return `${configurationFilePath + baseConfigurationName + profile}.${extension}`;
  }

  /** Choose the good driver depending on the extension * */
  private static getDriver(extension : string) : ConfigurationDriver {
    switch (extension.toLowerCase()) {
      case 'json':
        return new JsonConfigurationDriver();
      default:
        throw new Error('Extension not supported');
    }
  }

  private static getVcsConfiguration(
    parsedConfiguration : RawConfiguration,
  ) : AbstractVcsConfiguration {
    // @ts-ignore
    switch (parsedConfiguration[schemaDeclaration.VCS_TYPE.name]) {
      case Vcs.GITHUB:
        return GithubConfiguration.buildFromParsedConfiguration(parsedConfiguration);
      default: throw new Error('Only GITHUB is a supported VCS');
    }
  }
}
