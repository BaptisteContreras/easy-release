import MergeableElement from '../MergeableElement';
import AbstractGitMergeStrategy from './AbstractGitMergeStrategy';
import CherryPickMergeResult from '../../../model/merge/CherryPickMergeResult';
import GitMergeResult from '../../../model/git/GitMergeResult';
import MergeResult from '../../../model/merge/MergeResult';
import MergeCollectionResult from '../../../model/merge/MergeCollectionResult';

export default class GitCherryPick extends AbstractGitMergeStrategy {
  /**            Methods           * */

  // eslint-disable-next-line class-methods-use-this
  async merge(element: MergeableElement): Promise<MergeResult> {
    return GitCherryPick.convertGitResultToMergeResult(
      await this.gitDriver.cherryPick(element.getMergeIdentifier()),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async mergeAll(mergeableCollection: MergeableElement[]): Promise<MergeCollectionResult> {
    this.logger.info(`GitCherryPick handle merge of ${mergeableCollection.length} elements`);
    const mergeCollectionResult = new MergeCollectionResult();

    await this.handleMergeAll(mergeableCollection, mergeCollectionResult);

    this.logger.info('Cherry pick end');

    return mergeCollectionResult;
  }

  async resumeMerge(
    mergeableCollection : MergeableElement[], mergeCollectionResult: MergeCollectionResult,
  ) : Promise<void> {
    this.logger.info(`GitCherryPick handle merge resume  of ${mergeableCollection.length} elements`);

    const elementNotMerged = mergeableCollection.filter((el : MergeableElement) => !el.isMerged());

    await this.handleMergeAll(elementNotMerged, mergeCollectionResult);
  }

  private static convertGitResultToMergeResult(gitResult : GitMergeResult) : MergeResult {
    return new CherryPickMergeResult(
      gitResult.hasError(),
      gitResult.hasConflict(),
      gitResult.hasNoAction(),
      true,
      gitResult.getMergeId(),
    );
  }

  private async handleMergeAll(
    mergeableCollection : MergeableElement[], mergeCollectionResult: MergeCollectionResult,
  ) : Promise<void> {
    let hasConflict = false;
    let hasError = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const currentElement of mergeableCollection) {
      // eslint-disable-next-line no-await-in-loop
      const mergeResult = await this.merge(currentElement);
      hasConflict = hasConflict || mergeResult.hasConflict();
      hasError = hasError || mergeResult.hasError();

      mergeCollectionResult.addMergeResult(mergeResult);

      currentElement.setMerged(true);

      if (hasConflict || hasError) {
        this.logger.warning(`Cherry pick stop due to ${hasConflict ? 'a conflict' : 'an error'}`);
        mergeCollectionResult.setConflict(hasConflict);
        mergeCollectionResult.setError(hasError);
        mergeCollectionResult.setLastMergeResult(mergeResult);
        mergeCollectionResult.setLastMergedElement(currentElement);
        mergeCollectionResult.setHadError(hasError);
        mergeCollectionResult.setHadConflict(hasConflict);
        currentElement.setConflict(hasConflict);

        break;
      }
    }
  }
}
