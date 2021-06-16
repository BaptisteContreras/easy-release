import ConfigurationValidator from './ConfigurationValidator';

export default class StrictConfigurationValidator implements ConfigurationValidator {
  // eslint-disable-next-line class-methods-use-this
  validateConfiguration(schema: object, parsedOption: object): string[] {
    const validationError: string[] = [];
    Object.entries(schema).forEach((schemaKey, index) => {
      // validate :
      // - if its required
      // - its type
      // - its value (against a choice list in the schema)

      // @ts-ignore
      const errorMessage = this.validateUnitaryKey(schemaKey, parsedOption[schemaKey.name]);

      if (errorMessage) {
        validationError.push(errorMessage);
      }
    });

    return validationError;
  }

  /**
   * Return an empty string if the value is acceptable regarding the validation's schema.
   *  Otherwise, returns the error message
   * */
  // eslint-disable-next-line class-methods-use-this
  private validateUnitaryKey(schemaKeyDeclaration : string[], value : string) : string {
    return '';
  }
}
