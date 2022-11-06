import { DiscordGuildConfigService } from './config/discord-guild-config.service';
import { DiscordGuildService } from './discord-guild.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { DiscordGuildSoniaChannelNameEnum } from '../enums/discord-guild-sonia-channel-name.enum';
import { IDiscordGuildSoniaSendMessageToChannel } from '../interfaces/discord-guild-sonia-send-message-to-channel';
import { Guild, GuildChannel, NewsChannel, TextChannel, ThreadChannel } from 'discord.js';
import _ from 'lodash';
import { filter, take } from 'rxjs/operators';

export class DiscordGuildSoniaService extends AbstractService {
  private static _instance: DiscordGuildSoniaService;

  public static getInstance(): DiscordGuildSoniaService {
    if (_.isNil(DiscordGuildSoniaService._instance)) {
      DiscordGuildSoniaService._instance = new DiscordGuildSoniaService();
    }

    return DiscordGuildSoniaService._instance;
  }

  private _soniaGuild: Guild | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_SONIA_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessageToChannel(sendMessageToChannel: Readonly<IDiscordGuildSoniaSendMessageToChannel>): void {
    if (_.isNil(this._soniaGuild)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild does not exists`),
      });

      return;
    }

    const channel: GuildChannel | ThreadChannel | null | undefined = this.getSoniaGuildChannelByName(
      sendMessageToChannel.channelName
    );

    if (_.isNil(channel) || !channel.isText()) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Could not find channel with name: ${ChalkService.getInstance().value(sendMessageToChannel.channelName)}`
        ),
      });

      return;
    }

    if (channel.isThread()) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `The channel ${ChalkService.getInstance().value(
            sendMessageToChannel.channelName
          )} is actually a thread channel! We do not yet support it.`
        ),
      });

      return;
    }

    this._sendMessageToChannel(sendMessageToChannel, channel);
  }

  public getSoniaGuildChannelByName(
    channelName: Readonly<DiscordGuildSoniaChannelNameEnum>
  ): GuildChannel | ThreadChannel | null | undefined {
    if (_.isNil(this._soniaGuild)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild does not exists`),
      });

      return null;
    }

    return this._soniaGuild.channels.cache.find(({ name }: Readonly<GuildChannel | ThreadChannel>): boolean =>
      _.isEqual(_.toLower(_.deburr(name)), _.toLower(channelName))
    );
  }

  public setSoniaGuild(): void {
    this._soniaGuild = this._getSoniaGuild();

    if (_.isNil(this._soniaGuild)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild not found`),
      });

      return;
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild found`),
      });
    }
  }

  private _sendMessageToChannel(
    { messageResponse }: Readonly<IDiscordGuildSoniaSendMessageToChannel>,
    channel: Readonly<TextChannel | NewsChannel>
  ): void {
    channel
      .send({
        ...messageResponse.options,
        content: messageResponse.response,
      })
      .then((): void => {
        if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
          LoggerService.getInstance().log({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`channel message sent`),
          });
        }
      })
      .catch((error: unknown): void => {
        if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`channel message sending failed`),
          });
        }

        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().error(error),
        });
      });
  }

  private _getSoniaGuild(): Guild | undefined {
    return DiscordGuildService.getInstance().getGuildById(DiscordGuildConfigService.getInstance().getSoniaGuildId());
  }

  private _listen(): void {
    this._registerSubscription(
      DiscordClientService.getInstance()
        .isReady$()
        .pipe(
          filter((isReady: Readonly<boolean>): boolean => _.isEqual(isReady, true)),
          take(ONE_EMITTER)
        )
        .subscribe({
          next: (): void => {
            this.setSoniaGuild();
          },
        })
    );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`ready`)} Discord client state`),
    });
  }
}
