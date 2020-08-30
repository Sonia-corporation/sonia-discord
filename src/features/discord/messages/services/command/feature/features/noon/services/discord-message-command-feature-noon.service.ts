import _ from "lodash";
import { AbstractService } from "../../../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { ChalkService } from "../../../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { discordCommandSplitMessageFlags } from "../../../../../../functions/commands/flags/discord-command-split-message-flags";
import { IDiscordMessageResponse } from "../../../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { IDiscordMessageFlag } from "../../../../../../types/commands/flags/discord-message-flag";
import { DiscordMessageCommandFeatureNameEnum } from "../../../enums/discord-message-command-feature-name.enum";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "../constants/discord-message-command-feature-noon-flags";
import { IDiscordMessageCommandFeatureNameNoon } from "../types/discord-message-command-feature-name-noon";

export class DiscordMessageCommandFeatureNoonService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureNoonService;

  public static getInstance(): DiscordMessageCommandFeatureNoonService {
    if (_.isNil(DiscordMessageCommandFeatureNoonService._instance)) {
      DiscordMessageCommandFeatureNoonService._instance = new DiscordMessageCommandFeatureNoonService();
    }

    return DiscordMessageCommandFeatureNoonService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE);
  }

  public isNoonFeature(
    featureName: Readonly<string | DiscordMessageCommandFeatureNameEnum>
  ): featureName is IDiscordMessageCommandFeatureNameNoon {
    return (
      featureName === DiscordMessageCommandFeatureNameEnum.NOON ||
      featureName === DiscordMessageCommandFeatureNameEnum.N
    );
  }

  /**
   * @description
   * This method should be called once the message command was validated entirely
   * Including checking that all flags were valid
   *
   * It will trigger the action on flags
   * Then return a response
   *
   * @param {Readonly<IAnyDiscordMessage>} anyDiscordMessage Original message
   * @param {Readonly<string>} messageFlags A partial message containing only a string with flags
   *
   * @return {Promise<IDiscordMessageResponse>} The embed message to respond
   */
  public getMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlags: Readonly<string>
  ): Promise<IDiscordMessageResponse> {
    return this._handleAllFlags(anyDiscordMessage, messageFlags);
  }

  private _handleAllFlags(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlags: Readonly<string>
  ): Promise<IDiscordMessageResponse> {
    const discordMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(
      messageFlags
    );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `handling all flags...`
      ),
    });

    return Promise.all(
      _.map(
        discordMessageFlags,
        (discordMessageFlag: Readonly<IDiscordMessageFlag>): Promise<unknown> =>
          this._handleFlag(anyDiscordMessage, discordMessageFlag)
      )
    ).then(
      (): Promise<IDiscordMessageResponse> => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `all flags handled`
          ),
        });

        return Promise.resolve({
          response: `No options for noon feature for now. Work in progress.`,
        });
      }
    );
  }

  private _handleFlag(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlag: Readonly<IDiscordMessageFlag>
  ): Promise<unknown> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `handling ${ChalkService.getInstance().value(messageFlag)} flag...`
      ),
    });

    return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.execute(messageFlag);
  }
}
