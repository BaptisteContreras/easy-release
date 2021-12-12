import MergeableElement from '../MergeableElement';
import MergeResult from '../../../model/merge/MergeResult';
import MergeCollectionResult from '../../../model/merge/MergeCollectionResult';

export default interface GitMergeStrategy {

  /**
   *  Merge all the given element in the current branch
   *  Returns true if there is a conflict during the merge
   * */
  mergeAll(mergeableCollection : MergeableElement[]) : Promise<MergeCollectionResult>;

  /**
   * Merge one element in the current branch
   * Returns a MergeResult object with all the information about the requested merge
   * */
  merge(element : MergeableElement) : Promise<MergeResult>;

  /**
   * Merge all element after a conflict
   * It takes care of already merged element
   */
  resumeMerge(
    mergeableCollection : MergeableElement[],
    mergeCollectionResult: MergeCollectionResult) : Promise<void>;
}
