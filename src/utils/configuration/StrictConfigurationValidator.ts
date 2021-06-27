import ConfigurationValidator from './ConfigurationValidator';
import { ConfigurationSchema, RawConfiguration } from '../../model/configuration/ConfigurationSchema';

export default class StrictConfigurationValidator implements ConfigurationValidator {
  // eslint-disable-next-line class-methods-use-this
  validateConfiguration(schema: object, parsedOption: RawConfiguration): string[] {
    const validationError: string[] = [];
    Object.entries(schema).forEach((schemaElement : ConfigurationSchema[], index) => {
      // validate :
      // - if its required
      // - its type
      // - its value (against a choice list in the schema)

      // @ts-ignore
      const parsedValue : string = parsedOption[schemaElement[1].name];
      // @ts-ignore
      const errorMessage = StrictConfigurationValidator.validateUnitaryKey(
        schemaElement[1], parsedValue,
      );

      if (errorMessage) {
        validationError.push(errorMessage);
      }
    });

    return validationError;
  }

  /**
   * Return an empty string if the value is acceptable regarding the validation's schema.
   * Otherwise, returns the error message
   * */
  private static validateUnitaryKey(
    schemaKeyDeclaration : ConfigurationSchema, value : string,
  ) : string {
    let errorMsg = StrictConfigurationValidator.validateRequiredValue(schemaKeyDeclaration, value);
    if (errorMsg === '') {
      errorMsg = StrictConfigurationValidator.validateChoiceValue(schemaKeyDeclaration, value);
    }

    return errorMsg;
  }

  private static validateRequiredValue(
    schemaKeyDeclaration : ConfigurationSchema, value : string,
  ) : string {
    if (schemaKeyDeclaration.required && (value === undefined || value === null || value === '')) {
      return `${schemaKeyDeclaration.name} value is missing`;
    }

    return '';
  }

  private static validateChoiceValue(
    schemaKeyDeclaration : ConfigurationSchema, value : string,
  ) : string {
    if (schemaKeyDeclaration.choices && !schemaKeyDeclaration.choices.includes(value)) {
      return `${schemaKeyDeclaration.name} value ${value} is not a valid choice`;
    }

    return '';
  }
}
