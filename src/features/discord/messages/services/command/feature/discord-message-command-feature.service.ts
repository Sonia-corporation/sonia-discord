import _ from "lodash";
import { AbstractService } from "../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { ChalkService } from "../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";
import { discordGetCommandFirstArgument } from "../../../functions/commands/discord-get-command-first-argument";
import { discordHasThisCommand } from "../../../functions/commands/discord-has-this-command";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";
import { DiscordMessageCommandFeatureErrorService } from "./discord-message-command-feature-error.service";
import { DiscordMessageCommandFeatureNoonService } from "./services/discord-message-command-feature-noon.service";

export class DiscordMessageCommandFeatureService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureService;

  public static getInstance(): DiscordMessageCommandFeatureService {
    if (_.isNil(DiscordMessageCommandFeatureService._instance)) {
      DiscordMessageCommandFeatureService._instance = new DiscordMessageCommandFeatureService();
    }

    return DiscordMessageCommandFeatureService._instance;
  }

  private readonly _commands: DiscordMessageCommandEnum[] = [
    DiscordMessageCommandEnum.FEATURE,
    DiscordMessageCommandEnum.F,
  ];

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE);
  }

  public handleResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse> {
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
  ): Promise<IDiscordMessageResponse> {
    if (_.isString(anyDiscordMessage.content)) {
      const featureName: string | null = this._getFeatureName(
        anyDiscordMessage.content
      );

      if (!_.isNil(featureName)) {
        if (
          DiscordMessageCommandFeatureNoonService.getInstance().isNoonFeature(
            featureName
          )
        ) {
          return DiscordMessageCommandFeatureNoonService.getInstance().getMessageResponse(
            anyDiscordMessage
          );
        }

        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `feature name ${ChalkService.getInstance().value(
              featureName
            )} not matching an existing feature`
          ),
        });
      } else {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `feature name not specified`
          ),
        });

        return DiscordMessageCommandFeatureErrorService.getInstance().getEmptyFeatureNameErrorMessageResponse();
      }
    }

    return DiscordMessageCommandFeatureErrorService.getInstance().getEmptyContentErrorMessageResponse();
  }

  public hasCommand(message: Readonly<string>): boolean {
    return discordHasThisCommand({
      commands: this._commands,
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getFeatureName(message: Readonly<string>): string | null {
    return discordGetCommandFirstArgument({
      commands: this._commands,
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }
}
