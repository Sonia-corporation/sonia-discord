import _ from "lodash";
import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";

export class DiscordGuildConfigCoreService implements IDiscordGuildConfig {
  private static _instance: DiscordGuildConfigCoreService;

  public static getInstance(): DiscordGuildConfigCoreService {
    if (_.isNil(DiscordGuildConfigCoreService._instance)) {
      DiscordGuildConfigCoreService._instance = new DiscordGuildConfigCoreService();
    }

    return DiscordGuildConfigCoreService._instance;
  }

  public shouldWelcomeNewMembers = true;
  public soniaPermanentGuildInviteUrl = `https://discord.gg/PW4JSkv`;
}
