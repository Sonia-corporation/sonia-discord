import _ from "lodash";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";

export class DiscordMessageConfigCoreService implements IDiscordMessageConfig {
  private static _instance: DiscordMessageConfigCoreService;

  public static getInstance(): DiscordMessageConfigCoreService {
    if (_.isNil(DiscordMessageConfigCoreService._instance)) {
      DiscordMessageConfigCoreService._instance = new DiscordMessageConfigCoreService();
    }

    return DiscordMessageConfigCoreService._instance;
  }

  public command: IDiscordMessageCommandConfig = {
    cookie: {
      imageColor: 16376750,
      imageUrl: `https://i.ibb.co/RTp4YPx/icons8-cookies-512.png`,
    },
    error: {
      imageColor: 15562905,
      imageUrl: `https://i.ibb.co/5jZmzSB/icons8-error-512.png`,
    },
    help: {
      imageColor: 7522991,
      imageUrl: `https://i.ibb.co/vLSnVk6/icons8-information-512.png`,
    },
    prefix: `!`,
    version: {
      imageColor: 11912416,
      imageUrl: `https://i.ibb.co/ph17BqP/icons8-artificial-intelligence-512.png`,
    },
  };
  public error: IDiscordMessageErrorConfig = {
    imageColor: 15562905,
    imageUrl: `https://i.ibb.co/r7PHJS1/icons8-bug-512.png`,
  };
}
