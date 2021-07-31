import Release from '../../../../model/release/Release';

export default interface ReleaseStorageDriver {
  /** Store a given release * */
  store(release : Release, location : string) : void;
}
