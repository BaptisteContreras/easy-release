import GitMergeStrategy from './GitMergeStrategy';
import LoggerInterface from '../../logger/LoggerInterface';
import GitDriver from '../../driver/git/GitDriver';
import MergeableElement from '../MergeableElement';
import MergeResult from '../../../model/merge/MergeResult';
import MergeCollectionResult from '../../../model/merge/MergeCollectionResult';

export default abstract class AbstractGitMergeStrategy implements GitMergeStrategy {
  protected logger : LoggerInterface;

  protected gitDriver : GitDriver;

  constructor(logger: LoggerInterface, gitDriver: GitDriver) {
    this.logger = logger;
    this.gitDriver = gitDriver;
  }

  abstract merge(element: MergeableElement): Promise<MergeResult>;

  abstract mergeAll(mergeableCollection: MergeableElement[]): Promise<MergeCollectionResult>;

  abstract resumeMerge(
    mergeableCollection: MergeableElement[],
    mergeCollectionResult: MergeCollectionResult): Promise<void>;
}
