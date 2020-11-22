import { Snowflake } from 'discord.js';

export interface IEnvironmentDiscordSonia {
  devGuildIdWhitelist?: Snowflake[];
  id: Snowflake;
  secretToken: string;
}
