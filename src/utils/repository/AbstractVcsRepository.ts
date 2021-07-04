import AbstractVcsDriver from '../driver/vcs/AbstractVcsDriver';
import VcsEnum from '../../model/enum/VcsEnum';
import LoggerInterface from '../logger/LoggerInterface';
import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';

export default abstract class AbstractVcsRepository {
  /**            Properties           * */

  protected vcsType : VcsEnum;

  protected vcsDriver : AbstractVcsDriver;

  protected logger : LoggerInterface;

  /**            Constructor           * */
  protected constructor(vcsType: VcsEnum, vcsDriver: AbstractVcsDriver, logger : LoggerInterface) {
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
}
