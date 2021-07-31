import ReleaseStorageDriver from './driver/ReleaseStorageDriver';
import Configuration from '../../../model/configuration/Configuration';
import Release from '../../../model/release/Release';
import LoggerInterface from '../../logger/LoggerInterface';

export default class ReleaseStorageHandler {
  /**            Properties           * */
  private storageDriver : ReleaseStorageDriver;

  private logger : LoggerInterface;

  private cwd : string;

  private easyreleaseDirName : string;

  /**            Construct           * */

  constructor(
    storageDriver: ReleaseStorageDriver, configuration : Configuration, logger : LoggerInterface,
  ) {
    this.storageDriver = storageDriver;
    this.cwd = configuration.getCwd();
    this.easyreleaseDirName = configuration.getEasyreleaseDirName();
    this.logger = logger;
  }

  /**            Methods           * */
  storeRelease(release : Release) : void {
    this.storageDriver.store(release, `${this.cwd}/${this.easyreleaseDirName}`);
  }
}
