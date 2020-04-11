import { Client } from "discord.js";
import _ from "lodash";

export class DiscordClientService {
  private static _instance: DiscordClientService;

  public static getInstance(): DiscordClientService {
    if (_.isNil(DiscordClientService._instance)) {
      DiscordClientService._instance = new DiscordClientService();
    }

    return DiscordClientService._instance;
  }

  public getClient(): Client {
    return {
      user: {
        username: `dummy-username`,
      },
    } as Client;
  }
}
