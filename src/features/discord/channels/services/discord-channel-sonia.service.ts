import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";

export class DiscordChannelSoniaService extends AbstractService {
  private static _instance: DiscordChannelSoniaService;

  public static getInstance(): DiscordChannelSoniaService {
    if (_.isNil(DiscordChannelSoniaService._instance)) {
      DiscordChannelSoniaService._instance = new DiscordChannelSoniaService();
    }

    return DiscordChannelSoniaService._instance;
  }

  protected constructor() {
    super(ServiceNameEnum.DISCORD_CHANNEL_SONIA_SERVICE);
  }
}
