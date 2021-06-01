import AbstractVcsDriver from '../../tools/driver/vcs/AbstractVcsDriver';

export default interface VcsDriverFactory {
  createVcsDriver() : AbstractVcsDriver
}
