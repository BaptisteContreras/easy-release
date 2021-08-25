export default class FsTools {
  /** Build the full path of a target, based on a base path  * */
  public static buildPath(basePath : string, target : string) : string {
    // TODO to improve
    return `${basePath}/${target}`;
  }
}
