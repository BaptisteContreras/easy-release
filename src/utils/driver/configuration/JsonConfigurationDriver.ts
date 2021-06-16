import ConfigurationDriver from './ConfigurationDriver';

export default class JsonConfigurationDriver implements ConfigurationDriver {
  // eslint-disable-next-line class-methods-use-this
  parseConfiguration(buffer: Buffer): object {
    return JSON.parse(buffer.toString());
  }
}
