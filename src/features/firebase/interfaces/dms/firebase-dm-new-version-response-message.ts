import { IObject } from '../../../../types/object';
import { Snowflake } from 'discord.js';

export interface IFirebaseDmNewVersionResponseMessage extends IObject {
  userId: Snowflake;
}
