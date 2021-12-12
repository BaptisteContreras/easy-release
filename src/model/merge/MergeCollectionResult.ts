import { Type, TypeHelpOptions } from 'class-transformer';
import MergeableElement from '../../utils/merge/MergeableElement';
import MergeResult from './MergeResult';
import InternalType from '../enum/InternalType';
import GithubCommit from '../github/GithubCommit';
import GitlabCommit from '../gitlab/GitlabCommit';
import AbstractCommit from '../common/AbstractCommit';
import AbstractMergeRequest from '../common/AbstractMergeRequest';
import CherryPickMergeResult from './CherryPickMergeResult';

export default class MergeCollectionResult {
  /**            Properties           * */
  private error : boolean;

  private conflict : boolean;

  private hadError: boolean;

  private hadConflict: boolean;

  @Type((item : TypeHelpOptions | undefined) => {
    const rawObject = item?.object;

    if (rawObject && rawObject.lastMergedElement) {
      const firstElement = rawObject.lastMergedElement;
      if (firstElement.internalType === InternalType.GITHUB_COMMIT) {
        return GithubCommit;
      }
      switch (firstElement.internalType) {
        case InternalType.GITHUB_COMMIT:
          return GithubCommit;
        case InternalType.GITLAB_COMMIT:
          return GitlabCommit;
        default: throw new Error('Deserialization error');
      }
    }
    return AbstractCommit;
  })
  private lastMergedElement : MergeableElement | null;

  @Type((item : TypeHelpOptions | undefined) => {
    const rawObject = item?.object;
    if (rawObject && rawObject.lastMergeResult.internalType === InternalType.CHERRY_PICK) {
      return CherryPickMergeResult;
    }

    return MergeResult;
  })
  private lastMergeResult : MergeResult | null;

  @Type((item : TypeHelpOptions | undefined) => {
    const rawObject = item?.object;

    if (rawObject && rawObject.mergeResultCollection) {
      const firstElement = rawObject.mergeResultCollection[0];
      if (firstElement.internalType === InternalType.CHERRY_PICK) {
        return CherryPickMergeResult;
      }
    }
    return MergeResult;
  })
  private mergeResultCollection : MergeResult[];

  /**            Constructor           * */

  constructor() {
    this.error = false;
    this.conflict = false;
    this.lastMergedElement = null;
    this.lastMergeResult = null;
    this.mergeResultCollection = [];
    this.hadError = false;
    this.hadConflict = false;
  }

  /**            Accessors           * */

  hasError(): boolean {
    return this.error;
  }

  setError(value: boolean) {
    this.error = value;
  }

  hasConflict(): boolean {
    return this.conflict;
  }

  setConflict(value: boolean) {
    this.conflict = value;
  }

  getLastMergedElement(): MergeableElement | null {
    return this.lastMergedElement;
  }

  setLastMergedElement(lastMergedElement: MergeableElement | null) {
    this.lastMergedElement = lastMergedElement;
  }

  getLastMergeResult(): MergeResult | null {
    return this.lastMergeResult;
  }

  setLastMergeResult(mergeResult: MergeResult | null) {
    this.lastMergeResult = mergeResult;
  }

  getMergeResultCollection(): MergeResult[] {
    return this.mergeResultCollection;
  }

  addMergeResult(mergeResult: MergeResult) {
    this.mergeResultCollection.push(mergeResult);
  }

  getHadConflict(): boolean {
    return this.hadConflict;
  }

  getHadError(): boolean {
    return this.hadError;
  }

  setHadConflict(hadConflict: boolean): void {
    this.hadConflict = this.hadConflict || hadConflict;
  }

  setHadError(hadError: boolean): void {
    this.hadError = this.hadError || hadError;
  }
}
