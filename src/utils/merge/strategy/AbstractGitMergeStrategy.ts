import GitMergeStrategy from './GitMergeStrategy';
import LoggerInterface from '../../logger/LoggerInterface';
import GitDriver from '../../driver/git/GitDriver';
import MergeableElement from '../MergeableElement';

export default abstract class AbstractGitMergeStrategy implements GitMergeStrategy {
  protected logger : LoggerInterface;

  protected gitDriver : GitDriver;

  constructor(logger: LoggerInterface, gitDriver: GitDriver) {
    this.logger = logger;
    this.gitDriver = gitDriver;
  }

  abstract merge(element: MergeableElement): void;

  abstract mergeAll(mergeableCollection: MergeableElement[]): void;
}
