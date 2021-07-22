import AbstractVcsPlatformDriver from '../driver/vcs/AbstractVcsPlatformDriver';
import VcsEnum from '../../model/enum/VcsEnum';
import LoggerInterface from '../logger/LoggerInterface';
import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';

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

  async getCommitsToCherryPick(mrsToDeliver : AbstractMergeRequest[]) : Promise<void> {
    this.vcsDriver.getCommitsForMr(mrsToDeliver[0]);
  }
}
