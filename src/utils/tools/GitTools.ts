export default class GitTools {
  /**            Methods           * */

  /** * */
  public static handleGitReleaseName(releaseBranchName : string, profile : string) : string {
    const today = new Date();
    const newReleaseBranchName = releaseBranchName || `${profile}-%Y%m%d%H%i%s%u`;

    return newReleaseBranchName
      .replace('%Y', String(today.getFullYear()))
      .replace('%m', (String(today.getMonth() + 1)).padStart(2, '0'))
      .replace('%d', (String(today.getDate())).padStart(2, '0'))
      .replace('%H', (String(today.getHours())).padStart(2, '0'))
      .replace('%i', (String(today.getMinutes())).padStart(2, '0'))
      .replace('%s', String(today.getSeconds()))
      .replace('%u', String(today.getMilliseconds()));
  }
}
