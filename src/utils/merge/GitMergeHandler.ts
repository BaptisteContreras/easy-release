import MergeableElement from './MergeableElement';
import MergeStrategy from '../../model/enum/MergeStrategy';
import GitMergeBranch from './strategy/GitMergeBranch';
import GitCherryPick from './strategy/GitCherryPick';
import GitMergeStrategy from './strategy/GitMergeStrategy';
import MergeCollectionResult from '../../model/merge/MergeCollectionResult';

export default class GitMergeHandler {
  private mergeBranchStrategy : GitMergeBranch;

  private cherryPickStrategy : GitCherryPick;

  constructor(mergeBranchStrategy: GitMergeBranch, cherryPickStrategy: GitCherryPick) {
    this.mergeBranchStrategy = mergeBranchStrategy;
    this.cherryPickStrategy = cherryPickStrategy;
  }

  async handleMerge(
    elementsToMerge : MergeableElement[], mergeStrategy : string,
  ) : Promise<MergeCollectionResult> {
    return this.selectStrategy(mergeStrategy).mergeAll(elementsToMerge);
  }

  private selectStrategy(mergeStrategy : string) : GitMergeStrategy {
    switch (mergeStrategy) {
      case MergeStrategy.BRANCH_MERGE:
        return this.mergeBranchStrategy;
      default: return this.cherryPickStrategy;
    }
  }

  async resumeMerge(
    mergeableCollection : MergeableElement[],
    mergeCollectionResult: MergeCollectionResult,
    mergeStrategy : string,
  ): Promise<void> {
    return this.selectStrategy(mergeStrategy)
      .resumeMerge(mergeableCollection, mergeCollectionResult);
  }
}
