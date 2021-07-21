import { Octokit } from '@octokit/rest';

export default class OctokitLibFactory {
  public static createOctokitClient(apiToken : string) : Octokit {
    return new Octokit({
      auth: apiToken,
    });
  }
}
