import { Type, TypeHelpOptions } from 'class-transformer';
import AbstractMergeRequest from '../common/AbstractMergeRequest';
import MergeableElement from '../../utils/merge/MergeableElement';
import MergeCollectionResult from '../merge/MergeCollectionResult';
import InternalType from '../enum/InternalType';
import GithubCommit from '../github/GithubCommit';
import GitlabCommit from '../gitlab/GitlabCommit';
import AbstractCommit from '../common/AbstractCommit';

export default class Release {
  /**            Properties           * */

  private error : boolean;

  private terminated : boolean;

  private conflict : boolean;

  private hadConflict: boolean;

  private hadError: boolean;

  @Type(() => AbstractMergeRequest)
  private mrs : AbstractMergeRequest[];

  @Type((item : TypeHelpOptions | undefined) => {
    const rawObject = item?.object;

    if (rawObject && rawObject.elementsToMerge.length) {
      const firstElement = rawObject.elementsToMerge[0];
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
  private elementsToMerge : MergeableElement[];

  private start : Date;

  private end : Date | null;

  @Type(() => MergeCollectionResult)
  private mergesResult : MergeCollectionResult | null;

  private pauseEnd : Date | null;

  private paused : boolean;

  private branchName: string;

  private mergeStrategy: string;

  private storageName: string;

  private storageExtension: string;

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
    this.pauseEnd = null;
    this.paused = false;
    this.branchName = '';
    this.mergeStrategy = '';
    this.hadConflict = false;
    this.hadError = false;
    this.storageName = '';
    this.storageExtension = '';
  }

  /**            Methods           * */

  terminate() : void {
    this.terminated = true;
    this.end = new Date();
    this.paused = false;
  }

  pause() : void {
    this.pauseEnd = new Date();
    this.paused = true;
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

  setStart(start: Date) : void {
    this.start = start;
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

  isPaused(): boolean {
    return this.paused;
  }

  getBranchName(): string {
    return this.branchName;
  }

  setBranchName(branchName: string): void {
    this.branchName = branchName;
  }

  getMergeStrategy(): string {
    return this.mergeStrategy;
  }

  setMergeStrategy(mergeStrategy: string): void {
    this.mergeStrategy = mergeStrategy;
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

  setStorageName(storageName: string): void {
    this.storageName = storageName;
  }

  getStorageName(): string {
    return this.storageName;
  }

  setStorageExtension(storageExtension: string): void {
    this.storageExtension = storageExtension;
  }

  getStorageExtension(): string {
    return this.storageExtension;
  }
}
