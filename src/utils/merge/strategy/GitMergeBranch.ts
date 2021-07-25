import MergeableElement from '../MergeableElement';
import AbstractGitMergeStrategy from './AbstractGitMergeStrategy';

export default class GitMergeBranch extends AbstractGitMergeStrategy {
  // eslint-disable-next-line class-methods-use-this
  merge(element: MergeableElement): Promise<boolean> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  mergeAll(mergeableCollection: MergeableElement[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}
