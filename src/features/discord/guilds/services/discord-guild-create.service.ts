import { DiscordGuildConfigService } from './config/discord-guild-config.service';
import { DiscordGuildSoniaService } from './discord-guild-sonia.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ONE_EMITTER } from '../../../../constants/one-emitter';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { FirebaseGuildsService } from '../../../firebase/services/guilds/firebase-guilds.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { isDiscordGuildChannelWritable } from '../../channels/functions/types/is-discord-guild-channel-writable';
import { DiscordChannelGuildService } from '../../channels/services/discord-channel-guild.service';
import { DiscordLoggerErrorService } from '../../logger/services/discord-logger-error.service';
import { IDiscordMessageResponse } from '../../messages/interfaces/discord-message-response';
import { DiscordMessageCommandCookieService } from '../../messages/services/command/cookie/services/discord-message-command-cookie.service';
import { DiscordMessageRightsService } from '../../messages/services/rights/discord-message-rights.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { DiscordGuildSoniaChannelNameEnum } from '../enums/discord-guild-sonia-channel-name.enum';
import { Guild, GuildChannel, Message, ThreadChannel } from 'discord.js';
import admin from 'firebase-admin';
import _ from 'lodash';
import { firstValueFrom } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';

export class DiscordGuildCreateService extends AbstractService {
  private static _instance: DiscordGuildCreateService;

  public static getInstance(): DiscordGuildCreateService {
    if (_.isNil(DiscordGuildCreateService._instance)) {
      DiscordGuildCreateService._instance = new DiscordGuildCreateService();
    }

    return DiscordGuildCreateService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessage(guild: Readonly<Guild>): Promise<Message | void> {
    return this._sendCookieMessage(guild);
  }

  public addFirebaseGuild(guild: Readonly<Guild>): Promise<admin.firestore.WriteResult | void> {
    return firstValueFrom(
      FirebaseGuildsService.getInstance()
        .isReady$()
        .pipe(
          filter((isReady: Readonly<boolean>): boolean => _.isEqual(isReady, true)),
          take(ONE_EMITTER),
          mergeMap(
            (): Promise<admin.firestore.WriteResult | void> =>
              FirebaseGuildsService.getInstance()
                .hasGuild(guild.id)
                .then((hasGuild: Readonly<boolean>): Promise<admin.firestore.WriteResult | void> => {
                  if (_.isEqual(hasGuild, false)) {
                    return this._addFirebaseGuild(guild).catch((): void => {
                      LoggerService.getInstance().debug({
                        context: this._serviceName,
                        message: ChalkService.getInstance().text(`could not add the guild into Firestore`),
                      });
                    });
                  }

                  LoggerService.getInstance().debug({
                    context: this._serviceName,
                    message: ChalkService.getInstance().text(`Firebase guild already created`),
                  });

                  return Promise.resolve();
                })
          )
        )
    );
  }

  private _addFirebaseGuild(guild: Readonly<Guild>): Promise<admin.firestore.WriteResult> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`guild not yet created on Firebase`),
    });

    return FirebaseGuildsService.getInstance()
      .addGuild(guild)
      .then((writeResult: Readonly<admin.firestore.WriteResult>): Promise<admin.firestore.WriteResult> => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`guild added into Firebase`),
        });

        return Promise.resolve(writeResult);
      });
  }

  private _sendCookieMessage(guild: Readonly<Guild>): Promise<Message | void> {
    if (!this._canSendCookiesMessage()) {
      return Promise.reject(new Error(`Can not send cookies message`));
    }

    const primaryGuildChannel: GuildChannel | ThreadChannel | null =
      DiscordChannelGuildService.getInstance().getPrimary(guild);

    if (_.isNil(primaryGuildChannel)) {
      return Promise.reject(new Error(`No primary guild channel found`));
    }

    return this._sendCookieMessageToChannel(primaryGuildChannel);
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`guildCreate`, (guild: Readonly<Guild>): void => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`${wrapInQuotes(`guildCreate`)} event triggered`),
        });

        if (!DiscordMessageRightsService.getInstance().isSoniaAuthorizedForThisGuild(guild)) {
          LoggerService.getInstance().warning({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `Sonia is not authorized to send messages to this guild in local environment`
            ),
          });
          LoggerService.getInstance().debug({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `add the guild id ${ChalkService.getInstance().value(
                guild.id
              )} to your secret environment under 'discord.sonia.devGuildIdWhitelist' to allow Sonia to interact with it`
            ),
          });

          return;
        }

        void this.sendMessage(guild);
        void this.addFirebaseGuild(guild);
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`guildCreate`)} event`),
    });
  }

  private _canSendCookiesMessage(): boolean {
    if (DiscordGuildConfigService.getInstance().shouldSendCookiesOnCreate()) {
      return true;
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`guild create cookies message sending disabled`),
    });

    return false;
  }

  private _sendCookieMessageToChannel(guildChannel: Readonly<GuildChannel | ThreadChannel>): Promise<Message | void> {
    if (!isDiscordGuildChannelWritable(guildChannel)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`primary guild channel not writable`),
      });

      return Promise.reject(new Error(`Primary guild channel not writable`));
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`sending message for the guild create...`),
    });

    return this._getMessageResponse()
      .then(
        ({ content, options }: Readonly<IDiscordMessageResponse>): Promise<Message | void> =>
          guildChannel
            .send({
              ...options,
              content,
            })
            .then((message: Message): Promise<Message> => {
              LoggerService.getInstance().log({
                context: this._serviceName,
                message: ChalkService.getInstance().text(`cookies message for the create guild sent`),
              });

              return Promise.resolve(message);
            })
            .catch((error: Readonly<Error | string>): Promise<void> => {
              LoggerService.getInstance().error({
                context: this._serviceName,
                message: ChalkService.getInstance().text(`cookies message sending for the create guild failed`),
              });
              LoggerService.getInstance().error({
                context: this._serviceName,
                message: ChalkService.getInstance().error(error),
              });
              DiscordGuildSoniaService.getInstance().sendMessageToChannel({
                channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
                messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(error),
              });

              return Promise.reject(error);
            })
      )
      .catch((error: Readonly<Error | string>): Promise<void> => Promise.reject(error));
  }

  private _getMessageResponse(): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCookieService.getInstance().getMessageResponse();
  }
}
