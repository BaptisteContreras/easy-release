import ReleaseStorageHandler from '../../utils/release/storage/ReleaseStorageHandler';
import Configuration from '../../model/configuration/Configuration';
import JsonReleaseStorageDriver from '../../utils/release/storage/driver/JsonReleaseStorageDriver';
import LoggerInterface from '../../utils/logger/LoggerInterface';

export default class ReleaseStorageHandlerFactory {
  public static createJsonReleaseStorageHandler(
    configuration : Configuration, logger : LoggerInterface,
  ) : ReleaseStorageHandler {
    return new ReleaseStorageHandler(
      new JsonReleaseStorageDriver(logger),
      configuration,
      logger,
    );
  }
}
