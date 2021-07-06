import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';

export default interface InformationDisplayer {

  /** Display in the terminal an array with all MR to deliver * */
  displayMrToDeliver(mrsToDeliver : AbstractMergeRequest[]) : void;
}
