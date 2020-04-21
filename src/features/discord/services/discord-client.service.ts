import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../classes/enums/service-name.enum";

export class DiscordClientService extends AbstractService {
  private static _instance: DiscordClientService;

  public static getInstance(): DiscordClientService {
    if (_.isNil(DiscordClientService._instance)) {
      DiscordClientService._instance = new DiscordClientService();
    }

    return DiscordClientService._instance;
  }

  private readonly _client: Client = new Client();

  protected constructor() {
    super(ServiceNameEnum.DISCORD_CLIENT_SERVICE);
  }

  public getClient(): Client {
    return this._client;
  }
}
