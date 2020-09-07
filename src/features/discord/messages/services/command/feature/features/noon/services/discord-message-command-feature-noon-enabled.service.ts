import _ from "lodash";
import { AbstractService } from "../../../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { ChalkService } from "../../../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";

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

  public execute(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<unknown> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `executing ${ChalkService.getInstance().value(`enabled`)} action`
      ),
    });

    return Promise.resolve();
  }
}
