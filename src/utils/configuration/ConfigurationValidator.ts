export default interface ConfigurationValidator {
  /** Validate the parsed option against a schema and return a string array with all errors * */
  validateConfiguration(schema : object, parsedOption : object) : string[];
}
