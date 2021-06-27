export default [
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Show additional output',
  },
  {
    name: 'noConfigurationValidation',
    alias: 'n',
    type: Boolean,
    description: 'Disable the configuration validation',
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
  },
  {
    name: 'currentWorkDirectory',
    alias: 'w',
    type: Boolean,
    description: 'Change the current work directory',
  },
  {
    name: 'configurationFilePath',
    type: String,
    description: 'Set the configuration file path',
  },
  {
    name: 'profile',
    alias: 'p',
    type: String,
    description: 'Set the current profile',
  },
  {
    name: 'baseConfigurationName',
    type: String,
    description: 'Set the pattern for the beginning of the configuration file\'s name',
  },
  {
    name: 'configurationFileExtension',
    type: String,
    description: 'Set the configuration file\'s extension',
  },
];
