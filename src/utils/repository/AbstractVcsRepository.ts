import AbstractVcsDriver from '../driver/vcs/AbstractVcsDriver';
import VcsEnum from '../../model/enum/VcsEnum';

export default abstract class AbstractVcsRepository {
  /**            Properties           * */

  protected vcsType : VcsEnum;

  protected vcsDriver : AbstractVcsDriver;

  /**            Constructor           * */
  protected constructor(vcsType: VcsEnum, vcsDriver: AbstractVcsDriver) {
    this.vcsType = vcsType;
    this.vcsDriver = vcsDriver;
  }
}
