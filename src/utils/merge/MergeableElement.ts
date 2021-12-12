export default interface MergeableElement {
  /** Get an ID used to merge the element given a strategy */
  getMergeIdentifier() : string;

  setConflict(conflict : boolean) : void;

  setMerged(merged : boolean) : void;

  isMerged(): boolean;

  getInternalType(): string;
}
