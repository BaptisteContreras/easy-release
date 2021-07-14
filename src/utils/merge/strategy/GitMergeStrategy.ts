import MergeableElement from '../MergeableElement';

export default interface GitMergeStrategy {

  /** Merge all the given element in the current branch * */
  mergeAll(mergeableCollection : MergeableElement[]) : void;

  /** Merge one element in the current branch * */
  merge(element : MergeableElement) : void;
}
