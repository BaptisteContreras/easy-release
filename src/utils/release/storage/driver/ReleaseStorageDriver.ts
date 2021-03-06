import Release from '../../../../model/release/Release';

export default interface ReleaseStorageDriver {
  /** Store a given release * */
  store(release : Release, location : string) : Promise<void>;

  /** Store the hash of a release,
   * the optional hashAlgorithm parameter can let people select
   * a special hash algo (if supported by the driver implementation)
   * */
  storeHash(release : Release, location : string, hashAlgorithm : string | null) : Promise<void>;

  /** Store in a file the current release dir name * */
  storeCurrent(releaseDirName: string, location: string): Promise<void>;

  /** Read the release stored in the given location. We also check the hash of the data * */
  readReleaseData(location: string, hashLocation: string): object;

  /** Returns the file extension for files created by the driver * */
  getFilesExtension(): string;
}
