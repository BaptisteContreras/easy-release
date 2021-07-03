const GitHub = require('github-api');

export default class GithubApiLibFactory {
  /**            Properties           * */

  private static AUTH_METHOD = 'oauth';

  /**            Methods           * */

  public static createGithubApiLib(apiToken : String) : any {
    return new GitHub({
      token: apiToken,
      auth: GithubApiLibFactory.AUTH_METHOD,
    });
  }
}
