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
import { DiscordMessageHelpService } from '../../../../../discord-message-help.service';
import { EmbedFieldData, MessageEmbedOptions, Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonHelp<T extends string> implements DiscordCommandFlagActionValueless<T> {
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HELP;

  public execute(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    _value: Readonly<string | null | undefined>,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    return this.getMessageResponse(anyDiscordMessage, discordCommandFlags);
  }

  public getMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageHelpService.getInstance()
      .getMessageResponse()
      .then(
        (helpMessageResponse: Readonly<IDiscordMessageResponse>): Promise<IDiscordMessageResponse> =>
          Promise.resolve(
            _.merge({}, helpMessageResponse, {
              options: {
                embed: this._getMessageEmbed(anyDiscordMessage, discordCommandFlags),
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

  private _getMessageEmbed(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ): MessageEmbedOptions {
    return {
      description: this._getMessageDescription(),
      fields: this._getMessageEmbedFields(anyDiscordMessage, discordCommandFlags),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageDescription(): string {
    return `Below is the complete list of all flags available for the \`noon\` feature. You can even combine them!`;
  }

  private _getMessageEmbedFields(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ): EmbedFieldData[] {
    return _.concat(
      discordCommandFlags.getAllFlagsAsEmbedFields(),
      this._getMessageEmbedFieldExample(anyDiscordMessage, discordCommandFlags)
    );
  }

  private _getMessageEmbedFieldExample(
    { content }: Readonly<IAnyDiscordMessage>,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ): EmbedFieldData {
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
      name: `Example`,
      value: `\`${userCommand} ${_.toString(randomFlag)}\``,
    };
  }

  private _getMessageEmbedTitle(): string {
    return `So, you need my help with the \`noon\` feature? Cool.`;
  }
}
