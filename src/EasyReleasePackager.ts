import RepositoryFactory from './factory/repository/RepositoryFactory';
import AbstractVcsConfiguration from './model/configuration/AbstractVcsConfiguration';
import AbstractVcsRepository from './utils/repository/AbstractVcsRepository';

export default class EasyReleasePackager {
  /**            Properties           * */

  // @ts-ignore
  private repository : AbstractVcsRepository;

  // @ts-ignore
  private vcsConfiguration : AbstractVcsConfiguration;

  constructor(repository : AbstractVcsRepository) {
    this.repository = repository;
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
