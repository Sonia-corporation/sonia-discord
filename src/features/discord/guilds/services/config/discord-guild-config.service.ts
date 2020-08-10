import _ from "lodash";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core.service";

export class DiscordGuildConfigService extends AbstractService {
  private static _instance: DiscordGuildConfigService;

  public static getInstance(): DiscordGuildConfigService {
    if (_.isNil(DiscordGuildConfigService._instance)) {
      DiscordGuildConfigService._instance = new DiscordGuildConfigService();
    }

    return DiscordGuildConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_CONFIG_SERVICE);
  }

  public getConfig(): IDiscordGuildConfig {
    return {
      shouldSendCookiesOnCreate: this.shouldSendCookiesOnCreate(),
      shouldSendIlEstMidiMessage: this.shouldSendIlEstMidiMessage(),
      shouldWelcomeNewMembers: this.shouldWelcomeNewMembers(),
      soniaGuildId: this.getSoniaGuildId(),
      soniaPermanentGuildInviteUrl: this.getSoniaPermanentGuildInviteUrl(),
    };
  }

  public shouldSendCookiesOnCreate(): boolean {
    return DiscordGuildConfigCoreService.getInstance()
      .shouldSendCookiesOnCreate;
  }

  public shouldSendIlEstMidiMessage(): boolean {
    return DiscordGuildConfigCoreService.getInstance()
      .shouldSendIlEstMidiMessage;
  }

  public shouldWelcomeNewMembers(): boolean {
    return DiscordGuildConfigCoreService.getInstance().shouldWelcomeNewMembers;
  }

  public getSoniaGuildId(): string {
    return DiscordGuildConfigCoreService.getInstance().soniaGuildId;
  }

  public getSoniaPermanentGuildInviteUrl(): string {
    return DiscordGuildConfigCoreService.getInstance()
      .soniaPermanentGuildInviteUrl;
  }
}
