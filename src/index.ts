import EasyReleasePackager from './EasyReleasePackager';

import OptionsDefinition from './model/options/OptionsDefinition';
import UsageDefinition from './model/options/UsageDefinition';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
require('dotenv').config({ path: `${process.cwd()}/../config/.env` });

const options = commandLineArgs(OptionsDefinition);

if (options.help) {
  console.log(commandLineUsage(UsageDefinition));

  // @ts-ignore
  return 0;
}

const packager = new EasyReleasePackager();

console.log(options);

// @ts-ignore
return 0;
