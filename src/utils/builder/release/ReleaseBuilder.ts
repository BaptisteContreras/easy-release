import { plainToClass } from 'class-transformer';
import Release from '../../../model/release/Release';
import AbstractCommit from '../../../model/common/AbstractCommit';
import MergeRequest from '../../../model/gitlab/MergeRequest';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import MergeableElement from '../../merge/MergeableElement';
import ReleaseBuilderContainer from './ReleaseBuilderContainer';
import InternalType from '../../../model/enum/InternalType';
import GithubCommit from '../../../model/github/GithubCommit';
import LoggerInterface from '../../logger/LoggerInterface';
import PullRequest from '../../../model/github/PullRequest';

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
    const newMrs : AbstractMergeRequest[] = [];
    release.getMrs().forEach((el: AbstractMergeRequest) => {
      newMrs.push(this.container.getOrAdd<AbstractMergeRequest>(el.getInternalType(), el));
    });

    this.container.debug();
    console.log('NEW MRS');
    // console.log(newMrs);
    return release;
  }

  private registerCallbacks(): void {
    this.container.registerClassCallback(InternalType.GITHUB_COMMIT, this.callbackGithubCommit);
    this.container.registerClassCallback(InternalType.GITLAB_COMMIT, this.callbackGitlabCommit);
    this.container.registerClassCallback(InternalType.PULL_REQUEST, this.callbackPullRequest);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  private callbackGithubCommit(rawData: any): object {
    throw Error('No implem');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  private callbackGitlabCommit(rawData: any): object {
    throw Error('No implem');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  private callbackPullRequest(rawData: any): object {
    return plainToClass(PullRequest, rawData);
  }
}
