import Release from '../../../model/release/Release';

export default class ReleaseBuilder {
  /** Build a new release from data loaded from a previous release * */
  public static buildFromLoadedData(loadedData: object) : Release {
    const release = new Release();
    console.log(loadedData);

    return release;
  }
}
