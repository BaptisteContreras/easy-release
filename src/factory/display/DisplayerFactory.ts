import TkInformationDisplayer from '../../utils/display/terminalKit/TkInformationDisplayer';

export default class DisplayerFactory {
  public static createTerminalKitDisplayer() : TkInformationDisplayer {
    return new TkInformationDisplayer();
  }
}
