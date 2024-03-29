import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { DiscordCommandFlags } from '../../../../../../classes/commands/flags/discord-command-flags';
import { DiscordMessageCommandEnum } from '../../../../../../enums/commands/discord-message-command.enum';
import { discordGetCommandAndFirstArgument } from '../../../../../../functions/commands/getters/discord-get-command-and-first-argument';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../../../config/discord-message-config.service';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { APIEmbed, APIEmbedField, Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesHelp<T extends string>
  implements DiscordCommandFlagActionValueless<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HELP;

  public execute(
    anyDiscordMessage: IAnyDiscordMessage,
    _value: string | null | undefined,
    discordCommandFlags: DiscordCommandFlags<T>
  ): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    return this.getMessageResponse(anyDiscordMessage, discordCommandFlags);
  }

  public getMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    discordCommandFlags: DiscordCommandFlags<T>
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageHelpService.getInstance()
      .getMessageResponse()
      .then((helpMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(anyDiscordMessage, discordCommandFlags)],
          },
        };

        return Promise.resolve(_.merge({}, helpMessageResponse, message));
      });
  }

  private _logExecuteAction(discordMessageId: Snowflake): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `executing ${ChalkService.getInstance().value(`help`)} action`
      ),
    });
  }

  private _getMessageEmbed(
    anyDiscordMessage: IAnyDiscordMessage,
    discordCommandFlags: DiscordCommandFlags<T>
  ): APIEmbed {
    return {
      description: this._getMessageDescription(),
      fields: this._getMessageEmbedFields(anyDiscordMessage, discordCommandFlags),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageDescription(): string {
    return `Below is the complete list of all flags available for the release notes feature. You can even combine them!`;
  }

  private _getMessageEmbedFields(
    anyDiscordMessage: IAnyDiscordMessage,
    discordCommandFlags: DiscordCommandFlags<T>
  ): APIEmbedField[] {
    return _.concat(
      discordCommandFlags.getAllFlagsAsEmbedFields(),
      this._getMessageEmbedFieldExample(anyDiscordMessage, discordCommandFlags)
    );
  }

  private _getMessageEmbedFieldExample(
    { content }: IAnyDiscordMessage,
    discordCommandFlags: DiscordCommandFlags<T>
  ): APIEmbedField {
    const randomFlag: string | undefined = discordCommandFlags.getRandomFlagUsageExample();
    let userCommand: string | null = discordGetCommandAndFirstArgument({
      commands: [DiscordMessageCommandEnum.F, DiscordMessageCommandEnum.FEATURE],
      message: _.isNil(content) ? `` : content,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });

    if (_.isNil(userCommand)) {
      userCommand = `!${_.toLower(DiscordMessageCommandEnum.FEATURE)}`;
    }

    return {
      inline: false,
      name: `Example`,
      value: `\`${userCommand} ${_.toString(randomFlag)}\``,
    };
  }

  private _getMessageEmbedTitle(): string {
    return `So, you need my help with the release notes feature? Cool.`;
  }
}
