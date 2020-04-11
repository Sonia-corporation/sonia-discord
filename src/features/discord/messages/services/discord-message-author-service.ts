import _ from "lodash";
import { AppConfigService } from "../../../app/services/config/app-config-service";
import { ProfileConfigService } from "../../../profile/services/profile-config-service";
import { addDiscordDevPrefix } from "../../functions/add-discord-dev-prefix";
import { DiscordAuthorService } from "../../users/services/discord-author-service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";

export class DiscordMessageAuthorService {
  private static _instance: DiscordMessageAuthorService;

  public static getInstance(): DiscordMessageAuthorService {
    if (_.isNil(DiscordMessageAuthorService._instance)) {
      DiscordMessageAuthorService._instance = new DiscordMessageAuthorService();
    }

    return DiscordMessageAuthorService._instance;
  }

  private readonly _profileConfigService = ProfileConfigService.getInstance();
  private readonly _discordAuthorService = DiscordAuthorService.getInstance();
  private readonly _appConfigService = AppConfigService.getInstance();

  public reply(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    let response = `Il est midi !`;

    if (this._discordAuthorService.isValid(anyDiscordMessage.author)) {
      if (
        this._discordAuthorService.hasValidUsername(anyDiscordMessage.author)
      ) {
        response = `Il est midi ${anyDiscordMessage.author.username} !`;
      }
    }

    return {
      response: this._getReplyWithEnvPrefix(response),
    };
  }

  private _getReplyWithEnvPrefix(response: Readonly<string>): string {
    if (!this._appConfigService.isProduction()) {
      return addDiscordDevPrefix(
        response,
        this._profileConfigService.getNickname()
      );
    }

    return response;
  }
}
