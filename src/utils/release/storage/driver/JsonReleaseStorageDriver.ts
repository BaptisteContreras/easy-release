import ReleaseStorageDriver from './ReleaseStorageDriver';
import Release from '../../../../model/release/Release';

export default class JsonReleaseStorageDriver implements ReleaseStorageDriver {
  /**            Methods           * */

  // eslint-disable-next-line class-methods-use-this
  store(release: Release, location : string): void {
    const jsonContent = JSON.stringify(release);
    console.log(jsonContent);
  }
}
