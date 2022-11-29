import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { DiscordChannelEnum } from '../../../../../channels/enums/discord-channel.enum';
import { DiscordClientService } from '../../../../../services/discord-client.service';
import { DiscordSoniaService } from '../../../../../users/services/discord-sonia.service';
import { DiscordMessageCommandEnum } from '../../../../enums/commands/discord-message-command.enum';
import { discordHasThisCommand } from '../../../../functions/commands/checks/discord-has-this-command';
import { IDiscordMessageResponse } from '../../../../interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../../../config/discord-message-config.service';
import { DiscordMessageCommandCoreService } from '../../discord-message-command-core.service';
import { DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES } from '../constants/discord-message-command-heartbeat-description-messages';
import { DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES } from '../constants/discord-message-command-heartbeat-title-messages';
import {
  Client,
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from 'discord.js';
import { formatNumber } from 'humanize-plus';
import _ from 'lodash';
import moment from 'moment-timezone';

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

  public getMessageResponse(): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      options: {
        embeds: [this._getMessageEmbed()],
      },
    };

    return Promise.resolve(message);
  }

  public hasCommand(message: string): boolean {
    return discordHasThisCommand({
      commands: [DiscordMessageCommandEnum.HEARTBEAT, DiscordMessageCommandEnum.HB],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getMessageEmbed(): MessageEmbedOptions {
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

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandHeartbeatImageColor();
  }

  private _getMessageDescription(): string {
    return DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES.getRandomMessage();
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return [this._getMessageEmbedFieldWebsocketHeartbeat(), this._getMessageEmbedFieldRoundtripLatency()];
  }

  private _getMessageEmbedFieldWebsocketHeartbeat(): EmbedFieldData {
    const client: Client = DiscordClientService.getInstance().getClient();

    return {
      name: `My Websocket heartbeat`,
      value: `${_.toString(formatNumber(client.ws.ping))} ms`,
    };
  }

  private _getMessageEmbedFieldRoundtripLatency(): EmbedFieldData {
    return {
      name: `My roundtrip latency`,
      value: `unknown`,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `My heartbeat`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandHeartbeatImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES.getRandomMessage();
  }
}
