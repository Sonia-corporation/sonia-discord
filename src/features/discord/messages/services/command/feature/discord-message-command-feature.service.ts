import _ from "lodash";
import { AbstractService } from "../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { ChalkService } from "../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";
import { discordGetCommandFirstArgument } from "../../../functions/commands/getters/discord-get-command-first-argument";
import { discordGetCommandFlags } from "../../../functions/commands/getters/discord-get-command-flags";
import { discordHasThisCommand } from "../../../functions/commands/checks/discord-has-this-command";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/flags/discord-command-flags-errors";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";
import { DiscordMessageCommandFeatureNameEnum } from "./enums/discord-message-command-feature-name.enum";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "./features/noon/constants/discord-message-command-feature-noon-flags";
import { DiscordMessageCommandFeatureEmptyContentErrorService } from "./services/discord-message-command-feature-empty-content-error.service";
import { DiscordMessageCommandFeatureEmptyFeatureNameErrorService } from "./services/feature-names/discord-message-command-feature-empty-feature-name-error.service";
import { DiscordMessageCommandFeatureEmptyFlagsErrorService } from "./services/flags/discord-message-command-feature-empty-flags-error.service";
import { DiscordMessageCommandFeatureWrongFeatureNameErrorService } from "./services/feature-names/discord-message-command-feature-wrong-feature-name-error.service";
import { DiscordMessageCommandFeatureNoonService } from "./features/noon/services/discord-message-command-feature-noon.service";
import { DiscordMessageCommandFeatureWrongFlagsErrorService } from "./services/flags/discord-message-command-feature-wrong-flags-error.service";

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
      hasExtendedContext: true,
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
          const flags: string | null = this.getFlags(anyDiscordMessage.content);

          if (!_.isNil(flags)) {
            const flagsErrors: IDiscordCommandFlagsErrors | null = DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getErrors(
              flags
            );

            if (_.isNil(flagsErrors)) {
              return DiscordMessageCommandFeatureNoonService.getInstance().getMessageResponse(
                anyDiscordMessage
              );
            }

            return this._getWrongFlagsErrorMessageResponse(
              DiscordMessageCommandFeatureNameEnum.NOON,
              flagsErrors
            );
          }

          return this._getEmptyFlagsErrorMessageResponse(
            anyDiscordMessage,
            DiscordMessageCommandFeatureNameEnum.NOON
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

        return DiscordMessageCommandFeatureWrongFeatureNameErrorService.getInstance().getMessageResponse(
          anyDiscordMessage,
          this._commands,
          featureName
        );
      }

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`feature name not specified`),
      });

      return DiscordMessageCommandFeatureEmptyFeatureNameErrorService.getInstance().getMessageResponse(
        anyDiscordMessage,
        this._commands
      );
    }

    return DiscordMessageCommandFeatureEmptyContentErrorService.getInstance().getMessageResponse();
  }

  public hasCommand(message: Readonly<string>): boolean {
    return discordHasThisCommand({
      commands: this._commands,
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  public hasFlags(message: Readonly<string>): boolean {
    const flags: string | null = this.getFlags(message);

    return !_.isNil(flags);
  }

  public getFlags(message: Readonly<string>): string | null {
    return discordGetCommandFlags({
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

  private _getEmptyFlagsErrorMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    featureName: Readonly<DiscordMessageCommandFeatureNameEnum>
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `feature name ${ChalkService.getInstance().value(
          _.capitalize(featureName)
        )} not having any flags`
      ),
    });

    return DiscordMessageCommandFeatureEmptyFlagsErrorService.getInstance().getMessageResponse(
      anyDiscordMessage,
      this._commands,
      featureName
    );
  }

  private _getWrongFlagsErrorMessageResponse(
    featureName: Readonly<DiscordMessageCommandFeatureNameEnum>,
    flagsErrors: Readonly<IDiscordCommandFlagsErrors>
  ): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `feature name ${ChalkService.getInstance().value(
          _.capitalize(featureName)
        )} not having all valid flags`
      ),
    });

    return DiscordMessageCommandFeatureWrongFlagsErrorService.getInstance().getMessageResponse(
      flagsErrors
    );
  }
}
