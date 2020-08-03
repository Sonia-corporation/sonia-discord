import { GuildChannel } from "discord.js";
import _ from "lodash";
import { createMock } from "ts-auto-mock";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";

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
    return createMock<GuildChannel>();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public setSoniaGuild(): void {}
}
