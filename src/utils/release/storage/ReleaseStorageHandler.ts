import ReleaseStorageDriver from './driver/ReleaseStorageDriver';
import Configuration from '../../../model/configuration/Configuration';
import Release from '../../../model/release/Release';
import LoggerInterface from '../../logger/LoggerInterface';
import FsTools from '../../tools/FsTools';

const uuid = require('uuid');

const fs = require('fs');

export default class ReleaseStorageHandler {
  /**            Properties           * */
  private storageDriver : ReleaseStorageDriver;

  private logger : LoggerInterface;

  private cwd : string;

  private easyreleaseDirName : string;

  private releaseFileName : string;

  /**            Construct           * */

  constructor(
    storageDriver: ReleaseStorageDriver, configuration : Configuration, logger : LoggerInterface,
  ) {
    this.storageDriver = storageDriver;
    this.cwd = configuration.getCwd();
    this.easyreleaseDirName = configuration.getEasyreleaseDirName();
    this.logger = logger;
    this.releaseFileName = 'release';
  }

  /**            Methods           * */
  storeRelease(release : Release) : void {
    const easyReleaseFullPath = FsTools.buildPath(this.cwd, this.easyreleaseDirName);

    this.logger.debug(`easyReleaseFullPath : ${easyReleaseFullPath}`);

    if (!fs.existsSync(easyReleaseFullPath)) {
      this.logger.warning(`easyReleaseFullPath : ${easyReleaseFullPath} doesn't exist, let's create it`);
      fs.mkdirSync(easyReleaseFullPath);
    }

    let releaseStorageDirName = ReleaseStorageHandler.generateReleaseStorageDirName();
    let releaseStorageDirNameFullPath = FsTools.buildPath(
      easyReleaseFullPath, releaseStorageDirName,
    );

    this.logger.debug(`generate release dir name : ${releaseStorageDirName}`);
    this.logger.debug(`current release dir name full path ${releaseStorageDirNameFullPath}`);

    let nbTry = 0;
    const maxTry = 1000;
    while (fs.existsSync(releaseStorageDirNameFullPath)) {
      if (nbTry < maxTry) {
        this.logger.error('Cannot generate uniq release dir name');
        process.exit(1);
      }
      releaseStorageDirName = ReleaseStorageHandler.generateReleaseStorageDirName();
      releaseStorageDirNameFullPath = FsTools.buildPath(
        easyReleaseFullPath, releaseStorageDirName,
      );
      this.logger.debug(`generate release dir name : ${releaseStorageDirName}`);
      this.logger.debug(`current release dir name full path : ${releaseStorageDirNameFullPath}`);
      this.logger.warning('release dir name already exists, lets try again...');
      nbTry += 1;
    }

    this.logger.info(`Release dir name : ${releaseStorageDirName}`);
    this.logger.info(`Release dir name full path : ${releaseStorageDirNameFullPath}`);

    fs.mkdirSync(releaseStorageDirNameFullPath);
    this.logger.debug('mkdir release dir OK');

    this.storageDriver.store(
      release, FsTools.buildPath(releaseStorageDirNameFullPath, this.releaseFileName),
    );
  }

  private static generateReleaseStorageDirName() : string {
    const today = new Date();

    return `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}U${uuid.v4()}`;
  }
}
