import { plainToClass } from 'class-transformer';
import Release from '../../../model/release/Release';
import AbstractCommit from '../../../model/common/AbstractCommit';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import ReleaseBuilderContainer from './ReleaseBuilderContainer';
import InternalType from '../../../model/enum/InternalType';
import GithubCommit from '../../../model/github/GithubCommit';
import LoggerInterface from '../../logger/LoggerInterface';
import PullRequest from '../../../model/github/PullRequest';
import AbstractUser from '../../../model/common/AbstractUser';
import GithubUser from '../../../model/github/GithubUser';
import GithubIssue from '../../../model/github/GithubIssue';
import GithubLabel from '../../../model/github/GithubLabel';
import AbstractIssue from '../../../model/common/AbstractIssue';
import AbstractLabel from '../../../model/common/AbstractLabel';
import MergeableElement from '../../merge/MergeableElement';

export default class ReleaseBuilder {
  /**            Properties           * */
  private container : ReleaseBuilderContainer;

  /**            Constructor           * */

  constructor(logger: LoggerInterface) {
    this.container = new ReleaseBuilderContainer(logger);
    this.registerCallbacks();
  }

  /**            Methods           * */

  /** Build a new release from data loaded from a previous release * */
  public buildFromLoadedData(loadedData: any) : Release {
    const release = plainToClass(Release, loadedData);

    // We want to have the same AbstractCommit instance in the MRs if they have the same nodeId
    // TODO
    // We want to replace Commits in ElementsToMerge with commits in Mrs
    // if (
    //   release.getElementsToMerge().length
    //     && release.getElementsToMerge()[0] instanceof AbstractCommit) {
    //   const allCommits = release.getMrs()
    //     .map((mr : AbstractMergeRequest) => mr.getCommits())
    //     .flat();
    //
    //   const newElementsToMerge : MergeableElement[] = [];
    //   const commitsDone : String[] = [];
    //
    //   release.getElementsToMerge().forEach((el : MergeableElement) => {
    //     const currentMID = el.getMergeIdentifier();
    //     if (!commitsDone.includes(currentMID)) {
    //       commitsDone.push(currentMID);
    //       const commit = allCommits
    //         .filter(
    //           (currentCommit : AbstractCommit) =>
    //           currentCommit.getMergeIdentifier() === currentMID,
    //         );
    //       if (!commit.length) {
    //         throw new Error(`Deserialization e
    //         rror : Commit merge failed, ${currentMID} not found in MRs`);
    //       }
    //
    //       newElementsToMerge.push(commit[0]);
    //     }
    //   });
    //   release.setElementsToMerge(newElementsToMerge);
    // }

    // We create a new set of unique MR object
    const newMrs : AbstractMergeRequest[] = [];
    release.getMrs().forEach((el: AbstractMergeRequest) => {
      newMrs.push(this.container.getOrAdd<AbstractMergeRequest>(el.getInternalType(), el));
    });

    // Then for each unique MR, we want to ensure they have a unique commit object
    newMrs.forEach((mr: AbstractMergeRequest) => {
      const newCommits: AbstractCommit[] = [];

      mr.getCommits().forEach((commit: AbstractCommit) => {
        // For each commit of the current MR,
        // we replace the author and commiter with a unqiue instance of AbstractUser
        const uniqueCommit = this.container.getOrAdd<AbstractCommit>(
          commit.getInternalType(), commit,
        );

        newCommits.push(uniqueCommit);

        const oldAuthor = uniqueCommit.getAuthor();
        const oldCommiter = uniqueCommit.getCommitter();

        uniqueCommit.setAuthor(this.container.getOrAdd<AbstractUser>(
          oldAuthor.getInternalType(), oldAuthor,
        ));

        uniqueCommit.setCommitter(this.container.getOrAdd<AbstractUser>(
          oldCommiter.getInternalType(), oldCommiter,
        ));
      });

      mr.setCommits(newCommits);

      const oldOwner = mr.getOwner();
      mr.setOwner(this.container.getOrAdd<AbstractUser>(
        oldOwner.getInternalType(), oldOwner,
      ));

      const oldIssue = mr.getLinkedIssue();

      if (oldIssue === null) {
        throw new Error(`MR ${mr.getNumber()} has no linked issue`);
      }

      const uniqueIssue = this.container.getOrAdd<AbstractIssue>(
        oldIssue.getInternalType(), oldIssue,
      );

      mr.setLinkedIssue(uniqueIssue);

      const oldIssueOwner = uniqueIssue.getOwner();
      uniqueIssue.setOwner(this.container.getOrAdd<AbstractUser>(
        oldIssueOwner.getInternalType(), oldIssueOwner,
      ));

      const newLabels: AbstractLabel[] = [];
      uniqueIssue.getLabels().forEach((label: AbstractLabel) => {
        newLabels.push(this.container.getOrAdd<AbstractLabel>(label.getInternalType(), label));
      });
      uniqueIssue.setLabels(newLabels);
    });

    release.setMr(newMrs);

    const newElementsToMerge: MergeableElement[] = [];
    release.getElementsToMerge().forEach((el: MergeableElement) => {
      newElementsToMerge.push(this.container.getOrAdd<MergeableElement>(el.getInternalType(), el));
    });

    release.setElementsToMerge(newElementsToMerge);

    const mergeResult = release.getMergeResult();

    if (!mergeResult) {
      throw new Error('No merge result found in this release');
    }

    const oldLastMergedElement = mergeResult.getLastMergedElement();
    if (oldLastMergedElement !== null) {
      mergeResult.setLastMergedElement(
        this.container.getOrAdd<MergeableElement>(
          oldLastMergedElement.getInternalType(), oldLastMergedElement,
        ),
      );
    }
    console.log(release);
    return release;
  }

  private registerCallbacks(): void {
    this.container.registerClassCallback(
      InternalType.GITHUB_COMMIT, ReleaseBuilder.callbackGithubCommit,
    );

    this.container.registerClassCallback(
      InternalType.PULL_REQUEST, ReleaseBuilder.callbackPullRequest,
    );
    this.container.registerClassCallback(
      InternalType.GITHUB_USER, ReleaseBuilder.callbackGithubUser,
    );
    this.container.registerClassCallback(
      InternalType.GITHUB_ISSUE, ReleaseBuilder.callbackGithubIssue,
    );
    this.container.registerClassCallback(
      InternalType.GITHUB_LABEL, ReleaseBuilder.callbackGithubLabel,
    );
  }

  private static callbackGithubLabel(rawData: any): object {
    return plainToClass(GithubLabel, rawData);
  }

  private static callbackGithubIssue(rawData: any): object {
    return plainToClass(GithubIssue, rawData);
  }

  private static callbackGithubUser(rawData: any): object {
    return plainToClass(GithubUser, rawData);
  }

  private static callbackGithubCommit(rawData: any): object {
    return plainToClass(GithubCommit, rawData);
  }

  private static callbackPullRequest(rawData: any): object {
    return plainToClass(PullRequest, rawData);
  }
}
