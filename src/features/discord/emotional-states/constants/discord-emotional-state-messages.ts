import { Messages } from '../../messages/classes/messages';
import { DiscordSoniaEmotionalStateEnum } from '../enums/discord-sonia-emotional-state.enum';

export const DISCORD_EMOTIONAL_STATE_MESSAGES: Messages<DiscordSoniaEmotionalStateEnum> = new Messages<
  DiscordSoniaEmotionalStateEnum
>({
  defaultMessage: DiscordSoniaEmotionalStateEnum.CRAZY,
  messages: DiscordSoniaEmotionalStateEnum,
});
