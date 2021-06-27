export default class OptionsValidator {
  public static validateCliOptions(cliOptions : object) : boolean {
    return !!cliOptions.profile;
  }
}
