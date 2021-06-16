import EasyReleasePackager from './EasyReleasePackager';

import OptionsDefinition from './model/options/OptionsDefinition';
import UsageDefinition from './model/options/UsageDefinition';
import MainFactory from './factory/MainFactory';
import ConfigurationReader from './utils/configuration/ConfigurationReader';
import ConfigurationReaderFactory from './factory/configuration/ConfigurationReaderFactory';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
require('dotenv').config({ path: `${process.cwd()}/../config/.env` });

const options = commandLineArgs(OptionsDefinition);

if (options.help) {
  console.log(commandLineUsage(UsageDefinition));

  // @ts-ignore
  return 0;
}

ConfigurationReaderFactory.createConfigurationReader(true)
  .readConfiguration(
    'C:\\Users\\Baptiste\\Desktop\\test\\', 'recette', 'config-', 'json',
  );
// const packager = MainFactory.createApplication();

console.log(options);

// @ts-ignore
return 0;
