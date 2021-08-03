import ReleaseStorageDriver from './ReleaseStorageDriver';
import Release from '../../../../model/release/Release';

const fs = require('fs');

export default class JsonReleaseStorageDriver implements ReleaseStorageDriver {
  /**            Methods           * */

  // eslint-disable-next-line class-methods-use-this
  store(release: Release, location : string): void {
    const jsonContent = JSON.stringify(release);
    fs.writeFile(`${location}.json`, jsonContent, (err : any) => {
      if (err) throw err;
      console.log('Saved!');
    });
  }
}
