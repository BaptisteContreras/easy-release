export interface OptionDefinitionElement {
  name: string,
  alias: string,
  description: string,
  required: boolean,
  type: Object | StringConstructor | BooleanConstructor,
}

export interface CliOptions {
  verbose : boolean,
  noConfigurationValidation : boolean,
  help : boolean,
  currentWorkDirectory : string,
  configurationFilePath : string,
  profile : string,
  baseConfigurationName : string,
  configurationFileExtension : string,
  release : boolean,
  resume : boolean,
}

const optionsCliDefinition = [
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    required: false,
    description: 'Show additional output',
  } as OptionDefinitionElement,
  {
    name: 'noConfigurationValidation',
    alias: 'n',
    type: Boolean,
    description: 'Disable the configuration validation',
    required: false,
  } as OptionDefinitionElement,
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    required: false,
    description: 'Display this usage guide.',
  } as OptionDefinitionElement,
  {
    name: 'currentWorkDirectory',
    alias: 'w',
    type: Boolean,
    required: true,
    description: 'Change the current work directory',
  } as OptionDefinitionElement,
  {
    name: 'configurationFilePath',
    type: String,
    required: false,
    description: 'Set the configuration file path',
  } as OptionDefinitionElement,
  {
    name: 'profile',
    alias: 'p',
    type: String,
    required: true,
    description: 'Set the current profile',
  } as OptionDefinitionElement,
  {
    name: 'baseConfigurationName',
    type: String,
    required: false,
    description: 'Set the pattern for the beginning of the configuration file\'s title',
  } as OptionDefinitionElement,
  {
    name: 'configurationFileExtension',
    type: String,
    required: false,
    description: 'Set the configuration file\'s extension',
  } as OptionDefinitionElement,
  {
    name: 'release',
    type: Boolean,
    required: false,
    description: 'Start the release process',
  } as OptionDefinitionElement,
  {
    name: 'resume',
    type: Boolean,
    required: false,
    description: 'Resume the release process',
  } as OptionDefinitionElement,
];
// type CliOption =

export const optionsCliDefinitions = optionsCliDefinition;
