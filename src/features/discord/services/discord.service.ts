import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../classes/enums/service-name.enum";
import { DiscordAuthenticationService } from "../authentications/services/discord-authentication.service";
import { DiscordGuildCreateService } from "../guilds/services/discord-guild-create.service";
import { DiscordGuildMemberAddService } from "../guilds/services/discord-guild-member-add.service";
import { DiscordGuildService } from "../guilds/services/discord-guild.service";
import { DiscordLoggerService } from "../logger/services/discord-logger.service";
import { DiscordMessageService } from "../messages/services/discord-message.service";
import { DiscordMessageScheduleIlEstMidiService } from "../messages/services/schedule/discord-message-schedule-il-est-midi.service";
import { DiscordSoniaService } from "../users/services/discord-sonia.service";

export class DiscordService extends AbstractService {
  private static _instance: DiscordService;

  public static getInstance(): DiscordService {
    if (_.isNil(DiscordService._instance)) {
      DiscordService._instance = new DiscordService();
    }

    return DiscordService._instance;
  }

  protected constructor() {
    super(ServiceNameEnum.DISCORD_SERVICE);
    this.init();
  }

  public init(): void {
    DiscordSoniaService.getInstance();
    DiscordLoggerService.getInstance();
    DiscordGuildService.getInstance();
    DiscordGuildMemberAddService.getInstance();
    DiscordGuildCreateService.getInstance();
    DiscordMessageService.getInstance();
    DiscordAuthenticationService.getInstance();
    DiscordMessageScheduleIlEstMidiService.getInstance();
  }
}
