import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { IAnyDiscordChannel } from "../../../../../../discord/channels/types/any-discord-channel";
import { ChalkService } from "../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../logger/services/logger.service";
import { IFirebaseGuildChannelFeatureNoonVFinal } from "../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon-v-final";
import { IFirebaseGuildChannelFeatureVFinal } from "../../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final";
import { IFirebaseGuildChannel } from "../../../../../types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuildChannelVFinal } from "../../../../../types/guilds/channels/firebase-guild-channel-v-final";
import { IFirebaseGuildVFinal } from "../../../../../types/guilds/firebase-guild-v-final";
import { FirebaseGuildsChannelsService } from "../../firebase-guilds-channels.service";
import { FirebaseGuildsChannelsFeaturesService } from "../firebase-guilds-channels-features.service";
import { FirebaseGuildsChannelsFeaturesNoonService } from "./firebase-guilds-channels-features-noon.service";

export class FirebaseGuildsChannelsFeaturesNoonEnabledStateService extends AbstractService {
  private static _instance: FirebaseGuildsChannelsFeaturesNoonEnabledStateService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesNoonEnabledStateService {
    if (
      _.isNil(FirebaseGuildsChannelsFeaturesNoonEnabledStateService._instance)
    ) {
      FirebaseGuildsChannelsFeaturesNoonEnabledStateService._instance = new FirebaseGuildsChannelsFeaturesNoonEnabledStateService();
    }

    return FirebaseGuildsChannelsFeaturesNoonEnabledStateService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_STATE_SERVICE
    );
  }

  public isEnabled(
    { id }: Readonly<IFirebaseGuildChannel>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    if (!_.isNil(id)) {
      if (this._isValidChannel(id, firebaseGuild)) {
        if (this._isValidFeature(id, firebaseGuild)) {
          if (this._isValidNoonFeature(id, firebaseGuild)) {
            return (
              firebaseGuild.channels?.[id]?.features?.noon?.isEnabled ?? false
            );
          }
        }
      }
    } else {
      this._logInvalidChannelId(firebaseGuild);
    }

    return false;
  }

  private _isValidChannel(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    const channel: IFirebaseGuildChannelVFinal | undefined =
      firebaseGuild.channels && firebaseGuild.channels[channelId];

    if (FirebaseGuildsChannelsService.getInstance().isSet(channel)) {
      if (FirebaseGuildsChannelsService.getInstance().isUpToDate(channel)) {
        return true;
      }
      this._logChannelNotUpToDate(channelId, firebaseGuild);
    } else {
      this._logChannelNotSet(channelId, firebaseGuild);
    }

    return false;
  }

  private _isValidFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    const features: IFirebaseGuildChannelFeatureVFinal | undefined =
      firebaseGuild.channels && firebaseGuild.channels[channelId].features;

    if (FirebaseGuildsChannelsFeaturesService.getInstance().isSet(features)) {
      if (
        FirebaseGuildsChannelsFeaturesService.getInstance().isUpToDate(features)
      ) {
        return true;
      }
      this._logFeaturesNotUpToDate(channelId, firebaseGuild);
    } else {
      this._logFeaturesNotSet(channelId, firebaseGuild);
    }

    return false;
  }

  private _isValidNoonFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    const noon: IFirebaseGuildChannelFeatureNoonVFinal | undefined =
      firebaseGuild.channels &&
      firebaseGuild.channels[channelId].features?.noon;

    if (FirebaseGuildsChannelsFeaturesNoonService.getInstance().isSet(noon)) {
      if (
        FirebaseGuildsChannelsFeaturesNoonService.getInstance().isUpToDate(noon)
      ) {
        return true;
      }
      this._logNoonNotUpToDate(channelId, firebaseGuild);
    } else {
      this._logNoonNotSet(channelId, firebaseGuild);
    }

    return false;
  }

  private _logInvalidChannelId(
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._log(`unknown`, firebaseGuild, `has an invalid id`);
  }

  private _logChannelNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotUpToDate(channelId, firebaseGuild, `channel`);
  }

  private _logChannelNotSet(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotSet(channelId, firebaseGuild, `channel`);
  }

  private _logFeaturesNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotUpToDate(channelId, firebaseGuild, `features`);
  }

  private _logFeaturesNotSet(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotSet(channelId, firebaseGuild, `features`);
  }

  private _logNoonNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotUpToDate(channelId, firebaseGuild, `noon feature`);
  }

  private _logNoonNotSet(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotSet(channelId, firebaseGuild, `noon feature`);
  }

  private _logNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    entity: Readonly<string>
  ): void {
    this._logNot(channelId, firebaseGuild, entity, `up-to-date`);
  }

  private _logNotSet(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    entity: Readonly<string>
  ): void {
    this._logNot(channelId, firebaseGuild, entity, `set`);
  }

  private _logNot(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    entity: Readonly<string>,
    type: Readonly<string>
  ): void {
    this._log(channelId, firebaseGuild, `${entity} not ${type}`);
  }

  private _log(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    { id }: Readonly<IFirebaseGuildVFinal>,
    message: Readonly<string>
  ): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${ChalkService.getInstance().value(
          id
        )} channel ${ChalkService.getInstance().value(channelId)} ${message}`
      ),
    });
  }
}
