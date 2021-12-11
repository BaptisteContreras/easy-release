import MergeResult from './MergeResult';
import InternalType from '../enum/InternalType';

export default class CherryPickMergeResult extends MergeResult {
  constructor(
    error: boolean, conflict: boolean, noAction: boolean,
    processed: boolean, mergeId: string,
  ) {
    super(error, conflict, noAction, processed, mergeId);
    this.internalType = InternalType.CHERRY_PICK;
  }
}
