import 'reflect-metadata';
import UsageDefinition from './model/options/UsageDefinition';
import MainFactory from './factory/MainFactory';
import ConfigurationReaderFactory from './factory/configuration/ConfigurationReaderFactory';
import CliOptionsValidator from './utils/configuration/CliOptionsValidator';
import { CliOptions, optionsCliDefinitions } from './model/options/OptionsDefinition';
import LoggerFactory from './factory/logger/LoggerFactory';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
require('dotenv').config({ path: `${process.cwd()}/../config/.env` });

const options : CliOptions = commandLineArgs(optionsCliDefinitions);

console.log(typeof options);
if (options.help) {
  console.log(commandLineUsage(UsageDefinition));

  process.exit(0);
}

const cliErrors = CliOptionsValidator.validateRequiredCliOptions(options, optionsCliDefinitions);
if (cliErrors.length) {
  console.error(cliErrors);

  process.exit(1);
}

console.log(options);

const configuration = ConfigurationReaderFactory.createConfigurationReader(
  !options.noConfigurationValidation,
)
  .readConfiguration(
    options.configurationFilePath,
    options.profile,
    options.baseConfigurationName ?? 'config-',
    options.configurationFileExtension ?? 'json',
  ).mergeCliOptions(options);

const logger = LoggerFactory.createLogger(configuration);
logger.info('Logger created and ready !');

const packager = MainFactory.createApplication(configuration, logger);

console.log(configuration);

packager.run();
