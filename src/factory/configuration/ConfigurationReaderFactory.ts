import ConfigurationReader from '../../utils/configuration/ConfigurationReader';
import StrictConfigurationValidator from '../../utils/configuration/StrictConfigurationValidator';
import DefaultConfigurationValidator from '../../utils/configuration/DefaultConfigurationValidator';

export default class ConfigurationReaderFactory {
  public static createConfigurationReader(validateConfiguration : boolean) : ConfigurationReader {
    return new ConfigurationReader(
      validateConfiguration
        ? new StrictConfigurationValidator() : new DefaultConfigurationValidator(),
    );
  }
}
