import MergeableElement from '../MergeableElement';

export default interface GitMergeStrategy {

  /**
   *  Merge all the given element in the current branch
   *  Returns true if there is a conflict during the merge
   * */
  mergeAll(mergeableCollection : MergeableElement[]) : Promise<boolean>;

  /**
   * Merge one element in the current branch
   * Returns true if there is a conflict during the merge
   * */
  merge(element : MergeableElement) : Promise<boolean>;
}
