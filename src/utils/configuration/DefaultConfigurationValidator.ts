import ConfigurationValidator from './ConfigurationValidator';

export default class DefaultConfigurationValidator implements ConfigurationValidator {
  // eslint-disable-next-line class-methods-use-this
  validateConfiguration(schema: object, parsedOption: object): string[] {
    return []; // This configuration validator does not validate anything
  }
}
