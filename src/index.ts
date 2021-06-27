import OptionsDefinition from './model/options/OptionsDefinition';
import UsageDefinition from './model/options/UsageDefinition';
import MainFactory from './factory/MainFactory';
import ConfigurationReaderFactory from './factory/configuration/ConfigurationReaderFactory';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
require('dotenv').config({ path: `${process.cwd()}/../config/.env` });

const options = commandLineArgs(OptionsDefinition);

console.log(typeof options);
if (options.help) {
  console.log(commandLineUsage(UsageDefinition));

  // @ts-ignore
  return 0;
}

const configuration = ConfigurationReaderFactory.createConfigurationReader(
  options.noConfigurationValidation !== false,
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
