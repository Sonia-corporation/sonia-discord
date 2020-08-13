import _ from "lodash";
import { AbstractService } from "../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";
import { discordHasThisCommand } from "../../../functions/commands/discord-has-this-command";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandFeatureService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureService;

  public static getInstance(): DiscordMessageCommandFeatureService {
    if (_.isNil(DiscordMessageCommandFeatureService._instance)) {
      DiscordMessageCommandFeatureService._instance = new DiscordMessageCommandFeatureService();
    }

    return DiscordMessageCommandFeatureService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE);
  }

  public handleResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): IDiscordMessageResponse {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      extendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `feature command detected`
      ),
    });

    return this.getMessageResponse(anyDiscordMessage);
  }

  public getMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): IDiscordMessageResponse {
    if (_.isString(anyDiscordMessage.content)) {
      const featureName: string | undefined = this._getFeatureName(
        anyDiscordMessage.content
      );

      console.log(featureName);
    }

    return {
      response: `No feature for now. Work in progress.`,
    };
  }

  public hasCommand(message: Readonly<string>): boolean {
    return discordHasThisCommand({
      commands: [
        DiscordMessageCommandEnum.FEATURE,
        DiscordMessageCommandEnum.F,
      ],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getFeatureName(message: Readonly<string>): string | undefined {
    return message;
  }
}
