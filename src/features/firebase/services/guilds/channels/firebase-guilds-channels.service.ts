import _ from "lodash";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { FIREBASE_GUILD_CHANNEL_CURRENT_VERSION } from "../../../constants/guilds/channels/firebase-guild-channel-current-version";
import { ICreateFirebaseGuildChannel } from "../../../interfaces/guilds/channels/create-firebase-guild-channel";
import { INewFirebaseGuildChannel } from "../../../interfaces/guilds/channels/new-firebase-guild-channel";
import { IFirebaseGuildChannel } from "../../../types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuildChannelVFinal } from "../../../types/guilds/channels/firebase-guild-channel-v-final";
import { FirebaseUpdateCoreService } from "../../firebase-update-core.service";

export class FirebaseGuildsChannelsService extends FirebaseUpdateCoreService<
  IFirebaseGuildChannel,
  IFirebaseGuildChannelVFinal,
  ICreateFirebaseGuildChannel,
  INewFirebaseGuildChannel
> {
  private static _instance: FirebaseGuildsChannelsService;

  public static getInstance(): FirebaseGuildsChannelsService {
    if (_.isNil(FirebaseGuildsChannelsService._instance)) {
      FirebaseGuildsChannelsService._instance = new FirebaseGuildsChannelsService();
    }

    return FirebaseGuildsChannelsService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_SERVICE);
  }

  public isUpToDate(
    channel: Readonly<IFirebaseGuildChannel | IFirebaseGuildChannelVFinal>
  ): channel is IFirebaseGuildChannelVFinal {
    return _.isEqual(channel.version, FIREBASE_GUILD_CHANNEL_CURRENT_VERSION);
  }

  public create({
    id,
  }: Readonly<ICreateFirebaseGuildChannel>): INewFirebaseGuildChannel {
    return {
      id,
      version: FIREBASE_GUILD_CHANNEL_CURRENT_VERSION,
    };
  }

  public upgrade(
    channel: Readonly<IFirebaseGuildChannel>
  ): IFirebaseGuildChannelVFinal {
    return channel;
  }
}
