import { RawConfiguration } from '../../../model/configuration/ConfigurationSchema';

export default interface ConfigurationDriver{

  /** Read a Buffer and return a plain old JS object * */
  parseConfiguration(buffer : Buffer) : RawConfiguration;

}
