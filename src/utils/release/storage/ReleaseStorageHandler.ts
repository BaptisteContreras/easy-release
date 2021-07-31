import ReleaseStorageDriver from './driver/ReleaseStorageDriver';
import Configuration from '../../../model/configuration/Configuration';
import Release from '../../../model/release/Release';

export default class ReleaseStorageHandler {
  /**            Properties           * */
  private storageDriver : ReleaseStorageDriver;

  private cwd : string;

  private easyreleaseDirName : string;

  /**            Construct           * */

  constructor(storageDriver: ReleaseStorageDriver, configuration : Configuration) {
    this.storageDriver = storageDriver;
    this.cwd = configuration.getCwd();
    this.easyreleaseDirName = '';
  }

  /**            Methods           * */
  storeRelease(release : Release) : void {
    this.storageDriver.store(release, `${this.cwd}/${this.easyreleaseDirName}`);
  }
}
