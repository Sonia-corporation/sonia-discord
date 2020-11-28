import { IAnyDiscordMessage } from './any-discord-message';

export type IAnyDiscordMessageWithContent = IAnyDiscordMessage & Pick<IAnyDiscordMessage, 'content'>;
