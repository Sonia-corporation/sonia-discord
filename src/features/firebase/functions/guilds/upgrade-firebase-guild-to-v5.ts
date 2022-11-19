import { handleFirebaseGuildChannelBreakingChange } from './channels/handle-firebase-guild-channel-breaking-change';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildChannelV1 } from '../../interfaces/guilds/channels/firebase-guild-channel-v1';
import { IFirebaseGuildV4 } from '../../interfaces/guilds/firebase-guild-v4';
import { IFirebaseGuildV5 } from '../../interfaces/guilds/firebase-guild-v5';
import { IFirebaseGuildChannelVFinal } from '../../types/guilds/channels/firebase-guild-channel-v-final';
import _ from 'lodash';

export function upgradeFirebaseGuildToV5({
  channels,
  id,
  lastReleaseNotesVersion,
}: IFirebaseGuildV4): IFirebaseGuildV5 {
  return {
    channels: _.mapValues(
      channels,
      (channel: IFirebaseGuildChannelV1): IFirebaseGuildChannelVFinal =>
        handleFirebaseGuildChannelBreakingChange(channel)
    ),
    id,
    lastReleaseNotesVersion,
    version: FirebaseGuildVersionEnum.V5,
  };
}
