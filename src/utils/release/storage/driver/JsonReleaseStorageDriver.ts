import { sha512 } from 'js-sha512';
import ReleaseStorageDriver from './ReleaseStorageDriver';
import Release from '../../../../model/release/Release';
import AbstractReleaseStorageDriver from './AbstractReleaseStorageDriver';

const fs = require('fs');

export default class JsonReleaseStorageDriver extends AbstractReleaseStorageDriver {
  /**            Methods           * */

  store(release: Release, location : string): void {
    const jsonContent = JSON.stringify(release);
    this.logger.info(`Store release in JSON in ${location}`);
    this.logger.debug('Release JSON content');
    this.logger.debug(jsonContent);

    fs.writeFile(`${location}.json`, jsonContent, (err : any) => {
      if (err) {
        this.logger.error('save release on disk failed with the following error');
        this.logger.error(err);
        process.exit(1);
      }
      this.logger.info('Release saved on disk !');
    });
  }

  storeHash(release: Release, location: string, hashAlgorithm: string | null): void {
    const releaseHash = sha512(JSON.stringify(release));
    const jsonContent = {
      date: new Date(),
      algorithm: 'sha512',
      hash: releaseHash,
      metaHash: '',
    };

    this.logger.info(`Store release hash in JSON in ${location}`);
    this.logger.debug(`Release SHA512 hash is ${releaseHash}`);

    const metaHash = sha512(JSON.stringify(jsonContent));

    this.logger.debug(`Meta SHA512 hash is ${metaHash}`);

    jsonContent.metaHash = metaHash;

    fs.writeFile(`${location}.json`, JSON.stringify(jsonContent), (err : any) => {
      if (err) {
        this.logger.error('save release hash on disk failed with the following error');
        this.logger.error(err);
        process.exit(1);
      }
      this.logger.info('Release hash saved on disk ! ');
    });
  }
}
