import LoggerInterface from '../../utils/logger/LoggerInterface';
import GitDriver from '../../utils/driver/git/GitDriver';
import GitMergeHandler from '../../utils/merge/GitMergeHandler';
import GitMergeBranch from '../../utils/merge/strategy/GitMergeBranch';
import GitCherryPick from '../../utils/merge/strategy/GitCherryPick';

export default class MergeHandlerFactory {
  private logger : LoggerInterface;

  private gitDriver : GitDriver;

  constructor(logger: LoggerInterface, gitDriver: GitDriver) {
    this.logger = logger;
    this.gitDriver = gitDriver;
  }

  createMergeHandler() : GitMergeHandler {
    return new GitMergeHandler(
      this.createMergeBranchStrategy(),
      this.createCherryPickStrategy(),
    );
  }

  private createMergeBranchStrategy() : GitMergeBranch {
    return new GitMergeBranch(this.logger, this.gitDriver);
  }

  private createCherryPickStrategy() : GitCherryPick {
    return new GitCherryPick(this.logger, this.gitDriver);
  }
}
