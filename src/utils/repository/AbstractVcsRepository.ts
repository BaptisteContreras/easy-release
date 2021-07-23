import AbstractVcsPlatformDriver from '../driver/vcs/AbstractVcsPlatformDriver';
import VcsEnum from '../../model/enum/VcsEnum';
import LoggerInterface from '../logger/LoggerInterface';
import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';
import AbstractCommit from '../../model/common/AbstractCommit';

export default abstract class AbstractVcsRepository {
  /**            Properties           * */

  protected vcsType : VcsEnum;

  protected vcsDriver : AbstractVcsPlatformDriver;

  protected logger : LoggerInterface;

  /**            Constructor           * */
  protected constructor(
    vcsType: VcsEnum, vcsDriver: AbstractVcsPlatformDriver, logger : LoggerInterface,
  ) {
    this.vcsType = vcsType;
    this.vcsDriver = vcsDriver;
    this.logger = logger;
  }

  /** Returns the list of all MR to deliver * */
  async getMrToDeliver(deliverLabels : string[]) : Promise<AbstractMergeRequest[]> {
    const mrList = await this.vcsDriver.getOpenMrs();
    await Promise.all(mrList.map(async (mr) => {
      const issue = await this.vcsDriver.getLinkedIssue(mr);
      if (issue) {
        mr.setLinkedIssue(issue);
        this.logger.debug(`Link issue #${issue.getNumber()} to MR ${mr.getTitle()}`);
      }
    }));

    return mrList.filter((mr) => mr.getLinkedIssue()?.hasAtLeastOneLabel(deliverLabels));
  }

  async getCommitsToCherryPick(mrsToDeliver : AbstractMergeRequest[]) : Promise<AbstractCommit[]> {
    return (await Promise.all(mrsToDeliver.map(async (mr : AbstractMergeRequest) => {
      const mrCommits = await this.vcsDriver.getCommitsForMr(mr);
      this.logger.info(`${mrCommits.length} commit${mrCommits.length > 1 ? 's' : ''} found for MR ${mr.getNumber()}`);

      if (mrCommits.length === 0) {
        this.logger.warning(`No commit found for MR ${mr.getNumber()}`);
      }

      mrCommits.forEach((commit : AbstractCommit) => {
        this.logger.debug(`Link commit SHA : ${commit.getSha()} with message ${commit.getMessage()} to MR ${mr.getNumber()}`);
        mr.addCommit(commit);
      });

      return mrCommits;
    }))).flat();
  }
}
