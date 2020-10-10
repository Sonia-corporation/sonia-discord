import _ from "lodash";
import { AbstractService } from "../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { FIREBASE_GUILD_CHANNEL_CURRENT_VERSION } from "../../../constants/guilds/channels/firebase-guild-channel-current-version";
import { ICreateFirebaseGuildChannel } from "../../../interfaces/guilds/channels/create-firebase-guild-channel";
import { INewFirebaseGuildChannel } from "../../../interfaces/guilds/channels/new-firebase-guild-channel";
import { IFirebaseGuildChannel } from "../../../types/guilds/channels/firebase-guild-channel";
import { IFirebaseGuildChannelVFinal } from "../../../types/guilds/channels/firebase-guild-channel-v-final";

export class FirebaseGuildsChannelsService extends AbstractService {
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

  public isValid(
    channel: Readonly<IFirebaseGuildChannel | undefined>
  ): channel is IFirebaseGuildChannelVFinal {
    return this.isSet(channel) && this.isUpToDate(channel);
  }

  public isUpToDate(
    channel: Readonly<IFirebaseGuildChannel>
  ): channel is IFirebaseGuildChannelVFinal {
    return _.isEqual(channel.version, FIREBASE_GUILD_CHANNEL_CURRENT_VERSION);
  }

  public isSet(
    channel: Readonly<IFirebaseGuildChannel | undefined>
  ): channel is IFirebaseGuildChannel {
    return !_.isNil(channel);
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

  public getUpToDate(
    channel: Readonly<IFirebaseGuildChannel | undefined>,
    createChannel: Readonly<ICreateFirebaseGuildChannel>
  ): IFirebaseGuildChannelVFinal | INewFirebaseGuildChannel {
    if (this.isSet(channel) && !this.isUpToDate(channel)) {
      return this.upgrade(channel);
    }

    return this.create(createChannel);
  }
}
