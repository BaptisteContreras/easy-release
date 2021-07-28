import MergeableElement from '../MergeableElement';
import AbstractGitMergeStrategy from './AbstractGitMergeStrategy';
import MergeResult from '../../../model/merge/MergeResult';
import MergeCollectionResult from '../../../model/merge/MergeCollectionResult';

export default class GitMergeBranch extends AbstractGitMergeStrategy {
  // eslint-disable-next-line class-methods-use-this
  merge(element: MergeableElement): Promise<MergeResult> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  mergeAll(mergeableCollection: MergeableElement[]): Promise<MergeCollectionResult> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}
