import AbstractMergeRequest from '../common/AbstractMergeRequest';
import MergeableElement from '../../utils/merge/MergeableElement';
import MergeCollectionResult from '../merge/MergeCollectionResult';

export default class Release {
  /**            Properties           * */

  private error : boolean;

  private terminated : boolean;

  private conflict : boolean;

  private mrs : AbstractMergeRequest[];

  private elementsToMerge : MergeableElement[];

  private start : Date;

  private end : Date | null;

  private mergesResult : MergeCollectionResult | null;

  /**            Constructor           * */

  constructor() {
    this.error = false;
    this.terminated = false;
    this.conflict = false;
    this.mrs = [];
    this.elementsToMerge = [];
    this.start = new Date();
    this.end = null;
    this.mergesResult = null;
  }

  /**            Methods           * */

  terminate() : void {
    this.terminated = true;
    this.end = new Date();
  }
  /**            Accessors           * */

  hasError() : boolean {
    return this.error;
  }

  setError(hasError : boolean) : void {
    this.error = hasError;
  }

  isTerminated() : boolean {
    return this.terminated;
  }

  hasConflict() : boolean {
    return this.conflict;
  }

  setConflict(hasConflict : boolean) : void {
    this.conflict = hasConflict;
  }

  getMrs() : AbstractMergeRequest[] {
    return this.mrs;
  }

  addMr(mr : AbstractMergeRequest) : void {
    this.mrs.push(mr);
  }

  setMr(mrs : AbstractMergeRequest[]) : void {
    this.mrs = mrs;
  }

  getElementsToMerge() : MergeableElement[] {
    return this.elementsToMerge;
  }

  addElementsToMerge(elementToMerge : MergeableElement) : void {
    this.elementsToMerge.push(elementToMerge);
  }

  setElementsToMerge(elementsToMerge : MergeableElement[]) : void {
    this.elementsToMerge = elementsToMerge;
  }

  getStart() : Date {
    return this.start;
  }

  getEnd() : Date | null {
    return this.end;
  }

  getMergeResult() : MergeCollectionResult | null {
    return this.mergesResult;
  }

  setMergeResult(mergeResult : MergeCollectionResult) : void {
    this.mergesResult = mergeResult;
  }
}
