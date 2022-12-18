import { DiscordMessageCommandHeartbeatUpdateErrorService } from './discord-message-command-heartbeat-update-error.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { ChalkService } from '../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { DiscordChannelEnum } from '../../../../../channels/enums/discord-channel.enum';
import { DiscordClientService } from '../../../../../services/discord-client.service';
import { DiscordSoniaService } from '../../../../../users/services/discord-sonia.service';
import { DiscordMessageCommandEnum } from '../../../../enums/commands/discord-message-command.enum';
import { discordHasThisCommand } from '../../../../functions/commands/checks/discord-has-this-command';
import { IDiscordMessageResponse } from '../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../config/discord-message-config.service';
import { DiscordMessageCommandCoreService } from '../../discord-message-command-core.service';
import { DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES } from '../constants/discord-message-command-heartbeat-description-messages';
import { DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES } from '../constants/discord-message-command-heartbeat-title-messages';
import {
  APIEmbed,
  APIEmbedAuthor,
  APIEmbedField,
  APIEmbedFooter,
  APIEmbedImage,
  Client,
  EmbedBuilder,
  Message,
} from 'discord.js';
import { formatNumber } from 'humanize-plus';
import _ from 'lodash';
import moment from 'moment-timezone';

const ROUNDTRIP_LATENCY_EMBED_FIELD_INDEX = 1;

export class DiscordMessageCommandHeartbeatService extends DiscordMessageCommandCoreService {
  private static _instance: DiscordMessageCommandHeartbeatService;

  public static getInstance(): DiscordMessageCommandHeartbeatService {
    if (_.isNil(DiscordMessageCommandHeartbeatService._instance)) {
      DiscordMessageCommandHeartbeatService._instance = new DiscordMessageCommandHeartbeatService();
    }

    return DiscordMessageCommandHeartbeatService._instance;
  }

  public readonly allowedChannels: Set<DiscordChannelEnum> = new Set<DiscordChannelEnum>([
    DiscordChannelEnum.DM,
    DiscordChannelEnum.TEXT,
    DiscordChannelEnum.THREAD,
  ]);
  protected readonly _commandName: string = `heartbeat`;

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HEARTBEAT_SERVICE);
  }

  /**
   * @description
   * Get the message response related to the heartbeat command.
   * @returns {Promise<IDiscordMessageResponse>} Return a message response.
   */
  public getMessageResponse(): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      afterSending: (anyDiscordMessage: IAnyDiscordMessage, message: Message): Promise<void> =>
        this.afterSending(anyDiscordMessage, message),
      options: {
        embeds: [this._getMessageEmbed()],
      },
    };

    return Promise.resolve(message);
  }

  /**
   * @description
   * Check if the message contain the heartbeat command.
   * @param   {string}  message The message to check.
   * @returns {boolean}         Return true if the message contain the heartbeat command.
   */
  public hasCommand(message: string): boolean {
    return discordHasThisCommand({
      commands: [DiscordMessageCommandEnum.HEARTBEAT, DiscordMessageCommandEnum.HB],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  /**
   * @description
   * Update the roundtrip latency embed field with the calculated value.
   * Report to the Sonia guild errors channel in case of issue.
   * @param   {IAnyDiscordMessage} anyDiscordMessage The original message that trigger the command.
   * @param   {Message}            message           The original message sent as a response for the command.
   * @returns {Promise<void>}                        Returns a promise.
   */
  public async afterSending(anyDiscordMessage: IAnyDiscordMessage, message: Message): Promise<void> {
    const [previousEmbed] = message.embeds;
    const previousEmbedBuilder: EmbedBuilder = new EmbedBuilder(previousEmbed.data);

    LoggerService.getInstance().log({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `edit the embed message to update the roundtrip latency for the heartbeat command`
      ),
    });

    previousEmbedBuilder.setFields(
      previousEmbed.fields.map((field: APIEmbedField, index: number): APIEmbedField => {
        if (index === ROUNDTRIP_LATENCY_EMBED_FIELD_INDEX) {
          return this.getRoundtripLatencyEmbedField(field, message, anyDiscordMessage);
        }

        return field;
      })
    );

    await message
      .edit({
        embeds: [previousEmbed],
      })
      .then((): void => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `embed message updated with the roundtrip latency of the heartbeat command`
          ),
        });
      })
      .catch((error: Error): void => {
        DiscordMessageCommandHeartbeatUpdateErrorService.getInstance().handleError(anyDiscordMessage, error);
      });

    return Promise.resolve();
  }

  /**
   * @description
   * Return an embed field with the real calculated roundtrip latency.
   * Log it.
   * @param   {APIEmbedField}      embedField        The original embed field for the roundtrip latency.
   * @param   {Message}            message           The message that was sent containing the embed for the heartbeat command.
   * @param   {IAnyDiscordMessage} anyDiscordMessage The original message that trigger the heartbeat command.
   * @returns {APIEmbedField}                        Return the up-to-date embed field containing the real roundtrip latency value.
   */
  public getRoundtripLatencyEmbedField(
    embedField: APIEmbedField,
    message: Message,
    anyDiscordMessage: IAnyDiscordMessage
  ): APIEmbedField {
    const heartbeat = `${_.toString(formatNumber(message.createdTimestamp - anyDiscordMessage.createdTimestamp))} ms`;

    LoggerService.getInstance().log({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `heartbeat: ${ChalkService.getInstance().value(heartbeat)}`
      ),
    });

    return {
      ...embedField,
      value: heartbeat,
    };
  }

  private _getMessageEmbed(): APIEmbed {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageDescription(),
      fields: this._getMessageEmbedFields(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): APIEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandHeartbeatImageColor();
  }

  private _getMessageDescription(): string {
    return DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES.getRandomMessage();
  }

  private _getMessageEmbedFields(): APIEmbedField[] {
    return [this._getMessageEmbedFieldWebsocketHeartbeat(), this._getMessageEmbedFieldRoundtripLatency()];
  }

  private _getMessageEmbedFieldWebsocketHeartbeat(): APIEmbedField {
    const client: Client = DiscordClientService.getInstance().getClient();

    return {
      inline: false,
      name: `My Websocket heartbeat`,
      value: `${_.toString(formatNumber(client.ws.ping))} ms`,
    };
  }

  private _getMessageEmbedFieldRoundtripLatency(): APIEmbedField {
    return {
      inline: false,
      name: `My roundtrip latency`,
      value: `Calculating...`,
    };
  }

  private _getMessageEmbedFooter(): APIEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      icon_url: soniaImageUrl ?? undefined,
      text: `My heartbeat`,
    };
  }

  private _getMessageEmbedThumbnail(): APIEmbedImage {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandHeartbeatImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): string {
    return moment().toISOString();
  }

  private _getMessageEmbedTitle(): string {
    return DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES.getRandomMessage();
  }
}
