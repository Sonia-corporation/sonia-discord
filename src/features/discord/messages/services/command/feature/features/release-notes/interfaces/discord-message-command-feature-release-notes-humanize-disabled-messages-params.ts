import { IObject } from '../../../../../../../../../types/object';
import { IDiscordHumanizedChannel } from '../../../../../../../channels/types/discord-humanized-channel';

export interface IDiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesParams extends IObject {
  readonly channelType: IDiscordHumanizedChannel;
}
