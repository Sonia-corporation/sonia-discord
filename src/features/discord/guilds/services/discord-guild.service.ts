import { Guild, Snowflake } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";

export class DiscordGuildService extends AbstractService {
  private static _instance: DiscordGuildService;

  public static getInstance(): DiscordGuildService {
    if (_.isNil(DiscordGuildService._instance)) {
      DiscordGuildService._instance = new DiscordGuildService();
    }

    return DiscordGuildService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_SERVICE);
  }

  public init(): Promise<void> {
    return this._listen();
  }

  public getGuilds(): Guild[] {
    return DiscordClientService.getInstance().getClient().guilds.cache.array();
  }

  public getGuildById(guildId: Readonly<Snowflake>): Guild | undefined {
    return DiscordClientService.getInstance()
      .getClient()
      .guilds.cache.find((guild: Readonly<Guild>): boolean =>
        _.isEqual(guild.id, guildId)
      );
  }

  private _listen(): Promise<void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });

    return DiscordClientService.getInstance().isReady().then();
  }
}
