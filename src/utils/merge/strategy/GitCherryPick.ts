import MergeableElement from '../MergeableElement';
import AbstractGitMergeStrategy from './AbstractGitMergeStrategy';
import AbstractCommit from '../../../model/common/AbstractCommit';

export default class GitCherryPick extends AbstractGitMergeStrategy {
  // eslint-disable-next-line class-methods-use-this
  merge(element: MergeableElement): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.gitDriver.cherryPick(element.getMergeIdentifier())
        .then((d) => resolve(true))
        .catch((error) => console.log(error));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async mergeAll(mergeableCollection: MergeableElement[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.info(`GitCherryPick handle merge of ${mergeableCollection.length} elements`);
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const mergeableCollectionKey in mergeableCollection) {
        const element = mergeableCollection[mergeableCollectionKey];
        // const hasConflict;
        this.merge(element).then(() => resolve(true));
      }
      resolve(true);
    });
  }
}
