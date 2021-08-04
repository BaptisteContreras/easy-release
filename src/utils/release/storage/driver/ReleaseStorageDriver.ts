import Release from '../../../../model/release/Release';

export default interface ReleaseStorageDriver {
  /** Store a given release * */
  store(release : Release, location : string) : void;

  /** Store the hash of a release,
   * the optional hashAlgorithm parameter can let people select
   * a special hash algo (if supported by the driver implementation)
   * */
  storeHash(release : Release, location : string, hashAlgorithm : string | null) : void;
}
