import { Client } from "discord.js";
import _ from "lodash";
import { createMock } from "ts-auto-mock";

export class DiscordClientService {
  private static _instance: DiscordClientService;

  public static getInstance(): DiscordClientService {
    if (_.isNil(DiscordClientService._instance)) {
      DiscordClientService._instance = new DiscordClientService();
    }

    return DiscordClientService._instance;
  }

  private readonly _client = createMock<Client>();

  public getClient(): Client {
    return this._client;
  }
}
