import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { IAnyDiscordChannel } from "../../../../../../discord/channels/types/any-discord-channel";
import { IFirebaseGuildChannel } from "../../../../../types/guilds/channels/firebase-guild-channel";
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
      ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_SERVICE
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
    }

    return false;
  }

  private _isValidChannel(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId]
    );
  }

  private _isValidFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsFeaturesService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features
    );
  }

  private _isValidNoonFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsFeaturesNoonService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features?.noon
    );
  }
}
