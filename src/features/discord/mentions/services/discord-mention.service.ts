import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { isDiscordMessageMentions } from '../functions/is-discord-message-mentions';
import { IAnyDiscordMessageMentions } from '../types/any-discord-message-mentions';
import { GuildMember, Role, User } from 'discord.js';
import _ from 'lodash';

export class DiscordMentionService extends AbstractService {
  private static _instance: DiscordMentionService;

  public static getInstance(): DiscordMentionService {
    if (_.isNil(DiscordMentionService._instance)) {
      DiscordMentionService._instance = new DiscordMentionService();
    }

    return DiscordMentionService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MENTION_SERVICE);
  }

  public isValid(mention: unknown): mention is IAnyDiscordMessageMentions {
    return isDiscordMessageMentions(mention);
  }

  public isForEveryone({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    everyone,
  }: Readonly<IAnyDiscordMessageMentions>): boolean {
    return _.isEqual(everyone, true);
  }

  public isUserMentioned(
    anyDiscordMessageMentions: Readonly<IAnyDiscordMessageMentions>,
    user: User | GuildMember | Role
  ): boolean {
    return anyDiscordMessageMentions.has(user);
  }
}
