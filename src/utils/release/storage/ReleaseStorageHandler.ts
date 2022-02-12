import ReleaseStorageDriver from './driver/ReleaseStorageDriver';
import Configuration from '../../../model/configuration/Configuration';
import Release from '../../../model/release/Release';
import LoggerInterface from '../../logger/LoggerInterface';
import FsTools from '../../tools/FsTools';
import ReleaseBuilder from '../../builder/release/ReleaseBuilder';

const uuid = require('uuid');

const fs = require('fs');

export default class ReleaseStorageHandler {
  /**            Properties           * */
  private storageDriver : ReleaseStorageDriver;

  private logger : LoggerInterface;

  private cwd : string;

  private easyreleaseDirName : string;

  private releaseFileName : string;

  private releaseHashFileName : string;

  private currentReleaseNameFile : string;

  private easyReleaseFullPath : string;

  private releaseBuilder: ReleaseBuilder;

  /**            Construct           * */

  constructor(
    storageDriver: ReleaseStorageDriver, configuration : Configuration,
    logger : LoggerInterface, releaseBuilder: ReleaseBuilder,
  ) {
    this.storageDriver = storageDriver;
    this.cwd = configuration.getCwd();
    this.easyreleaseDirName = configuration.getEasyreleaseDirName();
    this.logger = logger;
    this.releaseFileName = 'release';
    this.releaseHashFileName = 'releaseHash';
    this.currentReleaseNameFile = '.current';
    this.easyReleaseFullPath = this.createEasyReleaseDir();
    this.releaseBuilder = releaseBuilder;
  }

  /**            Methods           * */
  async storeRelease(release : Release) : Promise<void> {
    let releaseStorageDirName = ReleaseStorageHandler.generateReleaseStorageDirName();
    let releaseStorageDirNameFullPath = FsTools.buildPath(
      this.easyReleaseFullPath, releaseStorageDirName,
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
        this.easyReleaseFullPath, releaseStorageDirName,
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

    release.setStorageName(releaseStorageDirName);
    release.setStorageExtension(this.storageDriver.getFilesExtension());

    await this.storageDriver.store(
      release, FsTools.buildPath(releaseStorageDirNameFullPath, this.releaseFileName),
    );

    await this.storageDriver.storeHash(
      release, FsTools.buildPath(releaseStorageDirNameFullPath, this.releaseHashFileName), null,
    );

    if (fs.existsSync(this.getCurrentFileLocation())) {
      this.logger.debug(`Delete the old current file: ${this.getCurrentFileLocation()}`);
      fs.rmSync(this.getCurrentFileLocation());
      this.logger.debug('Delete the old current file done');
    }

    if (!release.isTerminated()) {
      await this.storageDriver.storeCurrent(
        releaseStorageDirName,
        this.getCurrentFileLocation(),
      );
    }
  }

  async updateRelease(release : Release): Promise<void> {
    const storageDirName = release.getStorageName();
    const releaseStorageDirNameFullPath = FsTools.buildPath(
      this.easyReleaseFullPath, storageDirName,
    );

    if (!fs.existsSync(releaseStorageDirNameFullPath)) {
      throw new Error(`Release storage directory : ${releaseStorageDirNameFullPath} doesn't exist`);
    }

    const releaseStorageFileFullPath = FsTools.buildPath(
      releaseStorageDirNameFullPath, this.releaseFileName,
    );

    const releaseStorageFileFullPathWithExtension = `${releaseStorageFileFullPath}.${release.getStorageExtension()}`;

    if (fs.existsSync(releaseStorageFileFullPathWithExtension)) {
      this.logger.debug(`Delete the old release storage file: ${releaseStorageFileFullPathWithExtension}`);
      fs.rmSync(releaseStorageFileFullPathWithExtension);
      this.logger.debug('Delete the old release storage file done');
    }

    await this.storageDriver.store(
      release, releaseStorageFileFullPath,
    );

    const releaseMetadataStorageFileFullPath = FsTools.buildPath(
      releaseStorageDirNameFullPath, this.releaseHashFileName,
    );

    const releaseMetadataStorageFileFullPathWithExtension = `${releaseMetadataStorageFileFullPath}.${this.storageDriver.getFilesExtension()}`;

    if (fs.existsSync(releaseMetadataStorageFileFullPathWithExtension)) {
      this.logger.debug(`Delete the old release metadata storage file: ${releaseMetadataStorageFileFullPathWithExtension}`);
      fs.rmSync(releaseMetadataStorageFileFullPathWithExtension);
      this.logger.debug('Delete the old release metadata storage file done');
    }

    await this.storageDriver.storeHash(
      release, releaseMetadataStorageFileFullPath, null,
    );

    if (fs.existsSync(this.getCurrentFileLocation())) {
      this.logger.debug(`Delete the old current file: ${this.getCurrentFileLocation()}`);
      fs.rmSync(this.getCurrentFileLocation());
      this.logger.debug('Delete the old current file done');
    }

    if (!release.isTerminated()) {
      await this.storageDriver.storeCurrent(
        storageDirName,
        this.getCurrentFileLocation(),
      );
    }
  }

  /** Returns true is there is an active release that can be resume * */
  hasActiveRelease(): boolean {
    if (fs.existsSync(FsTools.buildPath(this.easyReleaseFullPath, this.currentReleaseNameFile))) {
      const activeReleaseDirName = fs.readFileSync(
        FsTools.buildPath(this.easyReleaseFullPath, this.currentReleaseNameFile),
      );

      const activeReleaseDirExists = fs.existsSync(
        FsTools.buildPath(this.easyReleaseFullPath, activeReleaseDirName),
      );

      if (!activeReleaseDirExists) {
        this.logger.warning('Active release found but its directory is missing');
      }

      return activeReleaseDirExists;
    }

    return false;
  }

  public getActiveReleaseName(): string {
    return fs.readFileSync(
      FsTools.buildPath(this.easyReleaseFullPath, this.currentReleaseNameFile),
    );
  }

  public loadRelease(releaseName: string): Release {
    const rawRelease = this.storageDriver.readReleaseData(
      FsTools.buildPath(this.easyReleaseFullPath, `${releaseName}/${this.releaseFileName}`),
      FsTools.buildPath(this.easyReleaseFullPath, `${releaseName}/${this.releaseHashFileName}`),
    );

    this.logger.debug('Raw release loaded, time to call the builder...');

    return this.releaseBuilder.buildFromLoadedData(rawRelease);
  }

  private static generateReleaseStorageDirName() : string {
    const today = new Date();

    return `${today.getFullYear()}_${String(today.getMonth() + 1).padStart(2, '0')}_${String(today.getDate()).padStart(2, '0')}U${uuid.v4()}`;
  }

  private createEasyReleaseDir() : string {
    const easyReleaseFullPath = FsTools.buildPath(this.cwd, this.easyreleaseDirName);

    this.logger.debug(`easyReleaseFullPath : ${easyReleaseFullPath}`);

    if (!fs.existsSync(easyReleaseFullPath)) {
      this.logger.warning(`easyReleaseFullPath : ${easyReleaseFullPath} doesn't exist, let's create it`);
      fs.mkdirSync(easyReleaseFullPath);
    }

    return easyReleaseFullPath;
  }

  private getCurrentFileLocation(): string {
    return FsTools.buildPath(this.easyReleaseFullPath, this.currentReleaseNameFile);
  }
}
