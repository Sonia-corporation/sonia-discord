import { NewsChannel, TextChannel, ThreadChannel } from 'discord.js';

export type IAnyDiscordWritableChannel = TextChannel | NewsChannel | ThreadChannel;
