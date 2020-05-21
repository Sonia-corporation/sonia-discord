import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { DiscordActivitySoniaService } from "../activities/services/discord-activity-sonia.service";
import { DiscordAuthenticationService } from "../authentications/services/discord-authentication.service";
import { DiscordSoniaEmotionalStateService } from "../emotional-states/services/discord-sonia-emotional-state.service";
import { DiscordGuildCreateService } from "../guilds/services/discord-guild-create.service";
import { DiscordGuildMemberAddService } from "../guilds/services/discord-guild-member-add.service";
import { DiscordGuildSoniaService } from "../guilds/services/discord-guild-sonia.service";
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

  public constructor() {
    super(ServiceNameEnum.DISCORD_SERVICE);
  }

  public init(): void {
    DiscordSoniaService.getInstance();
    DiscordLoggerService.getInstance().init();
    DiscordGuildService.getInstance().init();
    DiscordGuildMemberAddService.getInstance().init();
    DiscordGuildCreateService.getInstance().init();
    DiscordMessageService.getInstance().init();
    DiscordAuthenticationService.getInstance().init();
    DiscordMessageScheduleIlEstMidiService.getInstance().init();
    DiscordGuildSoniaService.getInstance().init();
    DiscordActivitySoniaService.getInstance().init();
    DiscordSoniaEmotionalStateService.getInstance().init();
  }
}
