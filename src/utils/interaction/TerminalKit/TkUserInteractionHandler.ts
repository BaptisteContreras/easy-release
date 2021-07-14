import UserInteractionHandler from '../UserInteractionHandler';
import AbstractMergeRequest from '../../../model/common/AbstractMergeRequest';
import MergeStrategy from '../../../model/enum/MergeStrategy';

const term = require('terminal-kit').terminal;

export default class TkUserInteractionHandler implements UserInteractionHandler {
  // eslint-disable-next-line class-methods-use-this
  async handleAskUserIfHeWantsToRemoveMr(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      term('Do you want to remove some MR from the release process ? [y|N]\n');
      term.yesOrNo({ yes: ['y'], no: ['n', 'ENTER'] }, (error : any, result : boolean) => {
        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleAskUserMrToRemove(mrsToDeliver : AbstractMergeRequest[]): Promise<AbstractMergeRequest> {
    return new Promise((resolve, reject) => {
      term.cyan('Choose a MR to remove :\n');

      const items = mrsToDeliver.map(
        (mr) => `Issue #${mr.getLinkedIssue()?.getNumber()} ${mr.getLinkedIssue()?.getName()} --> MR #${mr.getNumber()}`,
      );

      term.gridMenu(items, {
        exitOnUnexpectedKey: true,
      }, (error : any, response :any) => {
        if (response.unexpectedKey) {
          reject();
        } else {
          resolve(mrsToDeliver[response.selectedIndex]);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleAskUserToChangeReleaseBranchName(releaseBranchName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      term.cyan(`Current release branch name : ${releaseBranchName} . Do you want to change it [y|N] ?\n`);
      term.yesOrNo({ yes: ['y'], no: ['n', 'ENTER'] }, (error : any, result : boolean) => {
        if (result) {
          term.cyan('Enter the new release branch name : \n');
          term.inputField(
            (inputError : any, input : any) => {
              term.cyan('\n');
              resolve(input);
            },
          );
        } else {
          resolve(releaseBranchName);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleAskUserToChangeMergeStrategy(currentMergeStrategy: string): Promise<string> {
    return new Promise((resolve, reject) => {
      term.cyan(`Current merge strategy : ${currentMergeStrategy} . Do you want to change it [y|N] ?\n`);
      term.yesOrNo({ yes: ['y'], no: ['n', 'ENTER'] }, (error : any, result : boolean) => {
        if (result) {
          term.cyan('Select the merge strategy to apply : \n');
          term.gridMenu([MergeStrategy.CHERRY_PICK, MergeStrategy.BRANCH_MERGE], {
            exitOnUnexpectedKey: true,
          }, (error2 : any, response :any) => {
            if (response.unexpectedKey) {
              resolve(currentMergeStrategy);
            } else {
              resolve(response.selectedText);
            }
          });
        } else {
          resolve(currentMergeStrategy);
        }
      });
    });
  }
}
