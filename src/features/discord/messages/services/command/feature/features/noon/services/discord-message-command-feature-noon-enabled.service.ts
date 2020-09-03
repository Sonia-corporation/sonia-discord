import { Snowflake } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { toBoolean } from "../../../../../../../../../functions/formatters/to-boolean";
import { FirebaseGuildsStoreQuery } from "../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query";
import { IFirebaseGuildChannel } from "../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuild } from "../../../../../../../../firebase/types/guilds/firebase-guild";
import { ChalkService } from "../../../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";

export class DiscordMessageCommandFeatureNoonEnabledService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureNoonEnabledService;

  public static getInstance(): DiscordMessageCommandFeatureNoonEnabledService {
    if (_.isNil(DiscordMessageCommandFeatureNoonEnabledService._instance)) {
      DiscordMessageCommandFeatureNoonEnabledService._instance = new DiscordMessageCommandFeatureNoonEnabledService();
    }

    return DiscordMessageCommandFeatureNoonEnabledService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SERVICE);
  }

  public async execute(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value?: Readonly<string | null | undefined>
  ): Promise<unknown> {
    const shouldEnable: boolean = toBoolean(value, true);

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `executing ${ChalkService.getInstance().value(`enabled`)} action`
      ),
    });
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `new state: ${ChalkService.getInstance().value(shouldEnable)}`
      ),
    });

    const isEnabled: boolean | undefined = await this.isEnabled(
      anyDiscordMessage
    );

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `current state: ${ChalkService.getInstance().value(isEnabled)}`
      ),
    });

    return Promise.resolve();
  }

  public async isEnabled(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage);
    }

    const firebaseGuild:
      | IFirebaseGuild
      | undefined = FirebaseGuildsStoreQuery.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(
        anyDiscordMessage,
        anyDiscordMessage.guild.id
      );
    }

    return this._isNoonEnabled(firebaseGuild, anyDiscordMessage.channel.id);
  }

  private _isNoonEnabled(
    firebaseGuild: Readonly<IFirebaseGuild>,
    channelId: Readonly<Snowflake>
  ): boolean | undefined {
    const firebaseGuildChannel:
      | IFirebaseGuildChannel
      | undefined = this._getFirebaseGuildChannel(firebaseGuild, channelId);

    if (_.isNil(firebaseGuildChannel)) {
      return undefined;
    }

    return this._getFirebaseEnabledState(firebaseGuildChannel);
  }

  private _getFirebaseGuildChannel(
    firebaseGuild: Readonly<IFirebaseGuild>,
    channelId: Readonly<Snowflake>
  ): IFirebaseGuildChannel | undefined {
    return _.find(firebaseGuild.channels, [`id`, channelId]);
  }

  private _getFirebaseEnabledState(
    firebaseGuildChannel: Readonly<IFirebaseGuildChannel>
  ): boolean | undefined {
    return _.get(firebaseGuildChannel, `features.noon.isEnabled`);
  }

  private _getNoGuildMessageError({
    id,
  }: Readonly<IAnyDiscordMessage>): Promise<never> {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `could not get the guild from the message`
      ),
    });

    return Promise.reject(
      new Error(`Could not get the guild from the message`)
    );
  }

  private _getNoFirebaseGuildError(
    { id }: Readonly<IAnyDiscordMessage>,
    guildId: Readonly<Snowflake>
  ): Promise<never> {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `could not find the guild ${ChalkService.getInstance().value(
          guildId
        )} in Firebase`
      ),
    });

    return Promise.reject(
      new Error(`Could not find the guild ${guildId} in Firebase`)
    );
  }
}
