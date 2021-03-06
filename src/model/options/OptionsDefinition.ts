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
  push : string,
  append : boolean,
  list : boolean,
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
    type: String,
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
  {
    name: 'push',
    type: String,
    required: false,
    description: 'If set to "true", git push the release branch',
  } as OptionDefinitionElement,
  {
    name: 'append',
    type: Boolean,
    required: false,
    description: 'Append new commit to an existing release branch',
  } as OptionDefinitionElement,
  {
    name: 'list',
    type: Boolean,
    required: false,
    description: 'List all releases in the working dir',
  } as OptionDefinitionElement,
  {
    name: 'show',
    type: Boolean,
    required: false,
    description: 'Show details about a given release',
  } as OptionDefinitionElement,
  {
    name: 'clearCurrent',
    type: Boolean,
    required: false,
    description: 'Clear the current release',
  } as OptionDefinitionElement,
  {
    name: 'clearAll',
    type: Boolean,
    required: false,
    description: 'Clear all releases',
  } as OptionDefinitionElement,
  {
    name: 'clear',
    type: Boolean,
    required: false,
    description: 'Clear a given release',
  } as OptionDefinitionElement,
  {
    name: 'init',
    type: Boolean,
    required: false,
    description: 'Init the configuration',
  } as OptionDefinitionElement,
];

export const optionsCliDefinitions = optionsCliDefinition;
