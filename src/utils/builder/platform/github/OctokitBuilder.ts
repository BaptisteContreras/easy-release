import AbstractMergeRequest from '../../../../model/common/AbstractMergeRequest';
import PullRequest from '../../../../model/github/PullRequest';
import GithubIssue from '../../../../model/github/GithubIssue';
import GithubLabel from '../../../../model/github/GithubLabel';
import GithubUser from '../../../../model/github/GithubUser';
import GithubCommit from '../../../../model/github/GithubCommit';

export default class OctokitBuilder {
  /** Build a PullRequest from an Octokit PR object * */
  public static buildMr(githubPr : any, issueId : string) : AbstractMergeRequest {
    return new PullRequest(
      githubPr.title,
      githubPr.url,
      OctokitBuilder.buildUser(githubPr.user),
      githubPr.body,
      issueId,
      githubPr.state,
      new Date(githubPr.created_at),
      githubPr.updated_at ? new Date(githubPr.updated_at) : null,
      githubPr.number,
    );
  }

  /** Build a GithubIssue from an Octokit issue object * */
  public static buildIssue(githubIssue : any) : GithubIssue {
    return new GithubIssue(
      githubIssue.title,
      githubIssue.url,
      githubIssue.labels.map((githubLabel : any) => OctokitBuilder.buildLabel(githubLabel)),
      OctokitBuilder.buildUser(githubIssue.user),
      githubIssue.id,
      githubIssue.number,
    );
  }

  /** Build a GithubLabel from an Octokit label object * */
  public static buildLabel(githubLabel : any) : GithubLabel {
    return new GithubLabel(
      githubLabel.name,
      githubLabel.url,
      githubLabel.id,
      githubLabel.description,
    );
  }

  /** Build a GithubUser from an Octokit user object * */
  public static buildUser(rawGithubOwner : any) : GithubUser {
    return new GithubUser(
      rawGithubOwner.login,
      rawGithubOwner.html_url,
      rawGithubOwner.id,
    );
  }

  /** Build a GithubCommit from an Octokit commit object * */
  public static buildCommit(rawCommit : any) : GithubCommit {
    return new GithubCommit(
      rawCommit.sha,
      rawCommit.commit.message,
      rawCommit.node_id,
      OctokitBuilder.buildUser(rawCommit.author),
      OctokitBuilder.buildUser(rawCommit.committer),
    );
  }
}
