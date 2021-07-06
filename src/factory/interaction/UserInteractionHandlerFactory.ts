import TkUserInteractionHandler from '../../utils/interaction/TerminalKit/TkUserInteractionHandler';

export default class UserInteractionHandlerFactory {
  public static createTkInteractionHandler() : TkUserInteractionHandler {
    return new TkUserInteractionHandler();
  }
}
