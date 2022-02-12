import ReleaseStorageDriver from './ReleaseStorageDriver';
import Release from '../../../../model/release/Release';
import LoggerInterface from '../../../logger/LoggerInterface';

export default abstract class AbstractReleaseStorageDriver implements ReleaseStorageDriver {
  /**            Properties           * */
  protected logger : LoggerInterface;

  /**            Constructor           * */

  constructor(logger: LoggerInterface) {
    this.logger = logger;
  }

  /**            Methods           * */
  abstract store(release: Release, location: string): Promise<void>;

  abstract storeHash(
    release: Release, location: string, hashAlgorithm: string | null
  ): Promise<void>;

  abstract storeCurrent(releaseDirName: string, location: string): Promise<void>;

  abstract readReleaseData(location: string, hashLocation: string): object;

  abstract getFilesExtension(): string;
}
