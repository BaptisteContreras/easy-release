export default interface MergeableElement {
  /** Get an ID used to merge the element given a strategy */
  getMergeIdentifier() : string;
}
