import RepositoryFactory from './factory/repository/RepositoryFactory';
import AbstractVcsConfiguration from './model/configuration/AbstractVcsConfiguration';

export default class EasyReleasePackager {
  /**            Properties           * */

  // @ts-ignore
  private repositoryFactory : RepositoryFactory;

  // @ts-ignore
  private vcsConfiguration : AbstractVcsConfiguration;

  constructor() {
    this.configure();
  }

  configure() : void {
    // @ts-ignore
    this.repositoryFactory = null;
    console.log(process.env.TEST);
  }

  startPackage() : void {
    // @ts-ignore
    this.repositoryFactory = null;
  }

  resumePackage() : void {
    // @ts-ignore
    this.repositoryFactory = null;
  }
}
