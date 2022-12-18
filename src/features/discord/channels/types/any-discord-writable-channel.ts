import { AnyThreadChannel, NewsChannel, TextChannel } from 'discord.js';

export type IAnyDiscordWritableChannel = TextChannel | NewsChannel | AnyThreadChannel;
