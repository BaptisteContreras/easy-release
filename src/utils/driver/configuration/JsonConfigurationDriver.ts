import ConfigurationDriver from './ConfigurationDriver';
import { RawConfiguration } from '../../../model/configuration/ConfigurationSchema';

export default class JsonConfigurationDriver implements ConfigurationDriver {
  // eslint-disable-next-line class-methods-use-this
  parseConfiguration(buffer: Buffer): RawConfiguration {
    return JSON.parse(buffer.toString());
  }
}
