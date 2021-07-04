import { CliOptions, OptionDefinitionElement } from '../../model/options/OptionsDefinition';

export default class CliOptionsValidator {
  /**            Methods           * */

  /** Validate if all required options are * */
  public static validateRequiredCliOptions(
    cliOptions : CliOptions, cliOptionsDefinition : OptionDefinitionElement[],
  ) : string[] {
    const errors = [];
    /**
    cliOptionsDefinition.forEach((definitionElement) => {
      if (definitionElement.required && cliOptions[definitionElement.title]) {

      }
    });
     * */
    return [];
  }
}
