import { DiscordGuildConfigService } from './config/discord-guild-config.service';
import { DiscordGuildService } from './discord-guild.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { isDiscordWritableChannel } from '../../channels/functions/is-discord-writable-channel';
import { IAnyDiscordWritableChannel } from '../../channels/types/any-discord-writable-channel';
import { DiscordClientService } from '../../services/discord-client.service';
import { DiscordGuildSoniaChannelNameEnum } from '../enums/discord-guild-sonia-channel-name.enum';
import { IDiscordGuildSoniaSendMessageToChannel } from '../interfaces/discord-guild-sonia-send-message-to-channel';
import { Guild, GuildBasedChannel } from 'discord.js';
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

  public sendMessageToChannel(sendMessageToChannel: IDiscordGuildSoniaSendMessageToChannel): void {
    if (_.isNil(this._soniaGuild)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild does not exists`),
      });

      return;
    }

    const channel: GuildBasedChannel | null | undefined = this.getSoniaGuildChannelByName(
      sendMessageToChannel.channelName
    );

    if (_.isNil(channel)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Could not find channel with name: ${ChalkService.getInstance().value(sendMessageToChannel.channelName)}`
        ),
      });

      return;
    }

    if (!isDiscordWritableChannel(channel)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `The channel ${ChalkService.getInstance().value(
            sendMessageToChannel.channelName
          )} is not a writable channel. The support for ${ChalkService.getInstance().value(
            typeof channel
          )} channel is not yet there.`
        ),
      });

      return;
    }

    this._sendMessageToChannel(sendMessageToChannel, channel);
  }

  public getSoniaGuildChannelByName(
    channelName: DiscordGuildSoniaChannelNameEnum
  ): GuildBasedChannel | null | undefined {
    if (_.isNil(this._soniaGuild)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild does not exists`),
      });

      return null;
    }

    return this._soniaGuild.channels.cache.find(({ name }: GuildBasedChannel): boolean =>
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
    { messageResponse }: IDiscordGuildSoniaSendMessageToChannel,
    channel: IAnyDiscordWritableChannel
  ): void {
    channel
      .send({
        ...messageResponse.options,
        content: messageResponse.content,
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
          filter((isReady: boolean): boolean => _.isEqual(isReady, true)),
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
