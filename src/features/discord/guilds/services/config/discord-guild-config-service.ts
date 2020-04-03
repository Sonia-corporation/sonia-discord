import _ from "lodash";
import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core-service";

export class DiscordGuildConfigService {
  private static _instance: DiscordGuildConfigService;

  public static getInstance(): DiscordGuildConfigService {
    if (_.isNil(DiscordGuildConfigService._instance)) {
      DiscordGuildConfigService._instance = new DiscordGuildConfigService();
    }

    return DiscordGuildConfigService._instance;
  }

  private readonly _discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();

  public getConfig(): IDiscordGuildConfig {
    return {
      shouldWelcomeNewMembers: this.shouldWelcomeNewMembers(),
      soniaPermanentGuildInviteUrl: this.getSoniaPermanentGuildInviteUrl(),
    };
  }

  public shouldWelcomeNewMembers(): boolean {
    return this._discordGuildConfigCoreService.shouldWelcomeNewMembers;
  }

  public getSoniaPermanentGuildInviteUrl(): string {
    return this._discordGuildConfigCoreService.soniaPermanentGuildInviteUrl;
  }
}
