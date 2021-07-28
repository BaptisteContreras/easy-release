export default class GitMergeResult {
  private error : boolean;

  private conflict : boolean;

  private noAction : boolean;

  private mergeId : string;

  constructor(
    error: boolean, conflict: boolean, noAction: boolean, mergeId: string,
  ) {
    this.error = error;
    this.conflict = conflict;
    this.noAction = noAction;
    this.mergeId = mergeId;
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
}
