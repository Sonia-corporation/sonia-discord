import { EmbedFieldData, MessageEmbedOptions, Snowflake } from "discord.js";
import _ from "lodash";
import { ClassNameEnum } from "../../../../../../../../../enums/class-name.enum";
import { ChalkService } from "../../../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { DiscordCommandFlagActionValueless } from "../../../../../../classes/commands/flags/discord-command-flag-action-valueless";
import { IDiscordMessageResponse } from "../../../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { DiscordMessageHelpService } from "../../../../../discord-message-help.service";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "../constants/discord-message-command-feature-noon-flags";

export class DiscordMessageCommandFeatureNoonHelp
  implements DiscordCommandFlagActionValueless {
  private readonly _serviceName =
    ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HELP;

  public execute(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    return this.getMessageResponse();
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse> {
    return DiscordMessageHelpService.getInstance()
      .getMessageResponse()
      .then(
        (
          helpMessageResponse: Readonly<IDiscordMessageResponse>
        ): Promise<IDiscordMessageResponse> =>
          Promise.resolve(
            _.merge({}, helpMessageResponse, {
              options: {
                embed: this._getMessageEmbed(),
                split: false,
              },
              response: ``,
            })
          )
      );
  }

  private _logExecuteAction(discordMessageId: Readonly<Snowflake>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `executing ${ChalkService.getInstance().value(`help`)} action`
      ),
    });
  }

  private _getMessageEmbed(): MessageEmbedOptions {
    return {
      description: this._getMessageDescription(),
      fields: this._getMessageEmbedFields(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageDescription(): string {
    return `Below is the complete list of all flags available for the \`noon\` feature. You can even combine them!`;
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getAllFlagsAsEmbedFields();
  }

  private _getMessageEmbedTitle(): string {
    return `So, you need my help with the \`noon\` feature? Cool.`;
  }
}
