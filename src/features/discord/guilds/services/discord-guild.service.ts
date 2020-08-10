import { Guild, Snowflake } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
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

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_SERVICE);
  }

  public init(): Promise<void> {
    return this._listen();
  }

  public getGuilds(): Guild[] {
    return this._discordClientService.getClient().guilds.cache.array();
  }

  public getGuildById(guildId: Readonly<Snowflake>): Guild | undefined {
    return this._discordClientService
      .getClient()
      .guilds.cache.find((guild: Readonly<Guild>): boolean => {
        return _.isEqual(guild.id, guildId);
      });
  }

  private _listen(): Promise<void> {
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });

    return this._discordClientService.isReady().then();
  }
}
