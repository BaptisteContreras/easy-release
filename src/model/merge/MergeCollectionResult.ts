import MergeableElement from '../../utils/merge/MergeableElement';
import MergeResult from './MergeResult';

export default class MergeCollectionResult {
  /**            Properties           * */
  private error : boolean;

  private conflict : boolean;

  private lastMergedElement : MergeableElement | null;

  private lastMergeResult : MergeResult | null;

  private mergeResultCollection : MergeResult[];

  /**            Constructor           * */

  constructor() {
    this.error = false;
    this.conflict = false;
    this.lastMergedElement = null;
    this.lastMergeResult = null;
    this.mergeResultCollection = [];
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
}
