import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import InformationDisplayer from '../InformationDisplayer';

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
    });
  }
}
