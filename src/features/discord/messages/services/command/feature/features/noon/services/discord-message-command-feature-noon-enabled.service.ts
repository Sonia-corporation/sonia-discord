import _ from "lodash";
import { AbstractService } from "../../../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";

export class DiscordMessageCommandFeatureNoonEnabledService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureNoonEnabledService;

  public static getInstance(): DiscordMessageCommandFeatureNoonEnabledService {
    if (_.isNil(DiscordMessageCommandFeatureNoonEnabledService._instance)) {
      DiscordMessageCommandFeatureNoonEnabledService._instance = new DiscordMessageCommandFeatureNoonEnabledService();
    }

    return DiscordMessageCommandFeatureNoonEnabledService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SERVICE);
  }

  public execute(): Promise<unknown> {
    return Promise.resolve();
  }
}
