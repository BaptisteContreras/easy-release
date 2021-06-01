import RepositoryFactory from './factory/repository/RepositoryFactory';
import GithubConfiguration from './model/configuration/GithubConfiguration';

const configuration = new GithubConfiguration('TEST', 'TEST', '123');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const repositoryFactory = new RepositoryFactory(configuration);
