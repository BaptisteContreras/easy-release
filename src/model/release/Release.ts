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
}
