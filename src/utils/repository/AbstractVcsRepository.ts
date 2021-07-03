import AbstractVcsDriver from '../driver/vcs/AbstractVcsDriver';
import VcsEnum from '../../model/enum/VcsEnum';
import LoggerInterface from '../logger/LoggerInterface';

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
  async getMrToDeliver() : Promise<void> {
    const mrList = await this.vcsDriver.getOpenMrs();
    console.log(mrList);
  }
}
