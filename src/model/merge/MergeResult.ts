export default abstract class MergeResult {
  private error : boolean;

  private conflict : boolean;

  private noAction : boolean;

  private processed : boolean;

  private mergeId : string;

  protected internalType: string;

  constructor(
    error: boolean, conflict: boolean, noAction: boolean,
    processed: boolean, mergeId: string,
  ) {
    this.error = error;
    this.conflict = conflict;
    this.noAction = noAction;
    this.mergeId = mergeId;
    this.internalType = '';
    this.processed = processed;
  }

  hasError() : boolean {
    return this.error;
  }

  hasConflict() : boolean {
    return this.conflict;
  }

  getMergeId() : string {
    return this.mergeId;
  }

  hasNoAction() : boolean {
    return this.noAction;
  }

  hasBeenProcessed() : boolean {
    return this.processed;
  }

  getInternalType(): string {
    return this.internalType;
  }
}
