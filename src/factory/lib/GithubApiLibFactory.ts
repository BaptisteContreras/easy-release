import GitHub from 'github-api';

export default class GithubApiLibFactory {
  readonly AUTH_METHOD = 'oauth';

  createGithubApiLib(apiToken : String) : GitHub {
    return new GitHub({
      token: apiToken,
      auth: this.AUTH_METHOD,
    });
  }
}
