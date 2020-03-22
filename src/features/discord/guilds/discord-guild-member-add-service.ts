import { GuildChannel } from 'discord.js';
import _ from 'lodash';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { DiscordChannelGuildService } from '../channels/discord-channel-guild-service';
import { isDiscordGuildChannel } from '../channels/functions/is-discord-guild-channel';
import { AnyDiscordChannel } from '../channels/types/any-discord-channel';
import { DiscordClientService } from '../discord-client-service';
import { IDiscordMessageResponse } from '../messages/interfaces/discord-message-response';
import { isDiscordGuild } from './functions/is-discord-guild';
import { AnyGuildMember } from './types/any-guild-member';

export class DiscordGuildMemberAddService {
  private static _instance: DiscordGuildMemberAddService;

  public static getInstance(): DiscordGuildMemberAddService {
    if (_.isNil(DiscordGuildMemberAddService._instance)) {
      DiscordGuildMemberAddService._instance = new DiscordGuildMemberAddService();
    }

    return DiscordGuildMemberAddService._instance;
  }

  private readonly _discordClientService = DiscordClientService.getInstance().getClient();
  private readonly _discordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordGuildMemberAddService`;

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._discordClientService.on(`guildMemberAdd`, (member: Readonly<AnyGuildMember>): void => {
      this._handleMember(member);
    });
  }

  private _handleMember(member: Readonly<AnyGuildMember>): void {
    const memberChannel: GuildChannel | null = this._getPrimaryChannel(member);

    if (isDiscordGuildChannel(memberChannel)) {
      this._sendMessage(memberChannel, member);
    }
  }

  private _sendMessage(
    channel: Readonly<GuildChannel>,
    member: Readonly<AnyGuildMember>
  ): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(member);

    this._loggerService.debug(this._className, this._chalkService.text(`sending message for the new guild member...`));

    (channel as AnyDiscordChannel).send(messageResponse.response, messageResponse.options).then((): void => {
      this._loggerService.log(this._className, this._chalkService.text(`welcome message for the new guild message sent`));
    }).catch((error: unknown): void => {
      this._loggerService.error(this._className, this._chalkService.text(`message sending for the new guild member failed`));
      this._loggerService.error(this._className, this._chalkService.error(error));
    });
  }

  private _getMessageResponse(member: Readonly<AnyGuildMember>): IDiscordMessageResponse {
    return {
      response: `Bienvenue **${member.displayName}**, il est midi !`
    };
  }

  private _getPrimaryChannel(member: Readonly<AnyGuildMember>): GuildChannel | null {
    if (isDiscordGuild(member.guild)) {
      const primaryChannel: GuildChannel | undefined = member.guild.channels.cache.find((channel: Readonly<GuildChannel>): boolean => {
        return this._discordChannelGuildService.isGeneral(channel);
      });

      if (isDiscordGuildChannel(primaryChannel)) {
        return primaryChannel;
      }
    }

    return null;
  }
}
