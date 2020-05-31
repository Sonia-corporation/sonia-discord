import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { addDiscordDevPrefix } from "../../functions/dev-prefix/add-discord-dev-prefix";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";

export class DiscordMessageAuthorService extends AbstractService {
  private static _instance: DiscordMessageAuthorService;

  public static getInstance(): DiscordMessageAuthorService {
    if (_.isNil(DiscordMessageAuthorService._instance)) {
      DiscordMessageAuthorService._instance = new DiscordMessageAuthorService();
    }

    return DiscordMessageAuthorService._instance;
  }

  private readonly _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();
  private readonly _discordAuthorService: DiscordAuthorService = DiscordAuthorService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_AUTHOR_SERVICE);
  }

  public reply(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    let response = `Il est midi!`;

    if (this._discordAuthorService.isValid(anyDiscordMessage.author)) {
      if (
        this._discordAuthorService.hasValidUsername(anyDiscordMessage.author)
      ) {
        response = `Il est midi <@!${anyDiscordMessage.author.id}>!`;
      }
    }

    return {
      response: this._getReplyWithEnvPrefix(response),
    };
  }

  private _getReplyWithEnvPrefix(response: Readonly<string>): string {
    if (!this._appConfigService.isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: this._profileConfigService.getDiscordId(),
        message: response,
        nickname: this._profileConfigService.getNickname(),
      });
    }

    return response;
  }
}
