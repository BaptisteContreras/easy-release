import UsageDefinition from './model/options/UsageDefinition';
import MainFactory from './factory/MainFactory';
import ConfigurationReaderFactory from './factory/configuration/ConfigurationReaderFactory';
import CliOptionsValidator from './utils/configuration/CliOptionsValidator';
import { CliOptions, optionsCliDefinitions } from './model/options/OptionsDefinition';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
require('dotenv').config({ path: `${process.cwd()}/../config/.env` });

const options : CliOptions = commandLineArgs(optionsCliDefinitions);

console.log(typeof options);
if (options.help) {
  console.log(commandLineUsage(UsageDefinition));

  // @ts-ignore
  return 0;
}

const cliErrors = CliOptionsValidator.validateRequiredCliOptions(options, optionsCliDefinitions);
if (cliErrors.length) {
  console.error(cliErrors);

  // @ts-ignore
  return 1;
}

const configuration = ConfigurationReaderFactory.createConfigurationReader(
  options.noConfigurationValidation,
)
  .readConfiguration(
    options.configurationFilePath,
    options.profile,
    options.baseConfigurationName ?? 'config-',
    options.configurationFileExtension ?? 'json',
  );

const packager = MainFactory.createApplication(configuration, options);

console.log(options);

// @ts-ignore
return 0;
