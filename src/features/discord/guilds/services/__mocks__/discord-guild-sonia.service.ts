import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { GuildChannel } from 'discord.js';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

export class DiscordGuildSoniaService extends AbstractService {
  private static _instance: DiscordGuildSoniaService;

  public static getInstance(): DiscordGuildSoniaService {
    if (_.isNil(DiscordGuildSoniaService._instance)) {
      DiscordGuildSoniaService._instance = new DiscordGuildSoniaService();
    }

    return DiscordGuildSoniaService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_SONIA_SERVICE);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public sendMessageToChannel(): void {}

  public getSoniaGuildChannelByName(): GuildChannel | null | undefined {
    return createHydratedMock<GuildChannel>();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public setSoniaGuild(): void {}
}
