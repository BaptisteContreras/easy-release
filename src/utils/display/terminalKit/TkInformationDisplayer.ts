import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import InformationDisplayer from '../InformationDisplayer';
import AbstractCommit from '../../../model/common/AbstractCommit';

const term = require('terminal-kit').terminal;

export default class TkInformationDisplayer implements InformationDisplayer {
  /**            Methods           * */

  // eslint-disable-next-line class-methods-use-this
  public displayMrToDeliver(mrsToDeliver : AbstractMergeRequest[]) : void {
    term.table([
      ['MR', 'Issue', 'Labels', 'State'],
    ].concat(mrsToDeliver.map((mr) : any[] => [
      `#${mr.getNumber()} ${mr.getTitle()}`,
      `#${mr.getLinkedIssue()?.getNumber()} ${mr.getLinkedIssue()?.getName()}`,
      mr.getLinkedIssue()?.displayAllLabels(),
      'To deliver',
    ])), {
      hasBorder: true,
      contentHasMarkup: true,
      borderChars: 'lightRounded',
      borderAttr: { color: 'blue' },
      textAttr: { bgColor: 'default' },
      width: 100,
      fit: true,
      height: mrsToDeliver.length > 1 ? 3 * mrsToDeliver.length : 5,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  displayCommitsToMerge(commitsToDeliver: AbstractCommit[]): void {
    term.table([
      ['SHA', 'Message', 'Committer', 'Author', 'State'],
    ].concat(commitsToDeliver.map((commit) : any[] => [
      `${commit.getSha()}`,
      `${commit.getMessage()}`,
      `${commit.getCommitter().getName()}`,
      `${commit.getAuthor().getName()}`,
      'To deliver',
    ])), {
      hasBorder: true,
      contentHasMarkup: true,
      borderChars: 'lightRounded',
      borderAttr: { color: 'blue' },
      textAttr: { bgColor: 'default' },
      width: 300,
      fit: false,
      height: commitsToDeliver.length > 1 ? 3 * commitsToDeliver.length : 5,
    });
  }
}
