import { IObject } from '../../../../types/object';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildChannelVFinal } from '../../types/guilds/channels/firebase-guild-channel-v-final';
import { Snowflake } from 'discord.js';

export interface INewFirebaseGuild {
  channels: IObject<IFirebaseGuildChannelVFinal>;
  id: Snowflake;
  lastReleaseNotesVersion?: string;
  version: FirebaseGuildVersionEnum.V4;
}
