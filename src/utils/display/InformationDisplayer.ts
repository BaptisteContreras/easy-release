import AbstractMergeRequest from '../../model/common/AbstractMergeRequest';

const term = require('terminal-kit').terminal;

export default class InformationDisplayer {
  public static displayMrToDeliver(mrsToDeliver : AbstractMergeRequest[]) : void {
    term.table([
      ['MR', 'Issue', 'Labels', 'State'],
    ].concat(mrsToDeliver.map((mr) : any[] => [
      mr.getTitle(),
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
      fit: true, // Activate all expand/shrink + wordWrap
    });
  }
}
