import MergeableElement from '../MergeableElement';
import AbstractGitMergeStrategy from './AbstractGitMergeStrategy';

export default class GitMergeBranch extends AbstractGitMergeStrategy {
  // eslint-disable-next-line class-methods-use-this
  merge(element: MergeableElement): void {
  }

  // eslint-disable-next-line class-methods-use-this
  mergeAll(mergeableCollection: MergeableElement[]): void {
  }
}
