import _ from "lodash";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { addDiscordDevPrefix } from "../../functions/dev-prefix/add-discord-dev-prefix";
import { wrapUserIdIntoMention } from "../../mentions/functions/wrap-user-id-into-mention";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../types/any-discord-message";

export class DiscordMessageAuthorService extends AbstractService {
  private static _instance: DiscordMessageAuthorService;

  public static getInstance(): DiscordMessageAuthorService {
    if (_.isNil(DiscordMessageAuthorService._instance)) {
      DiscordMessageAuthorService._instance = new DiscordMessageAuthorService();
    }

    return DiscordMessageAuthorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_AUTHOR_SERVICE);
  }

  public reply({
    author,
  }: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    let response = `Il est midi!`;

    if (DiscordAuthorService.getInstance().isValid(author)) {
      if (DiscordAuthorService.getInstance().hasValidUsername(author)) {
        response = `Il est midi ${wrapUserIdIntoMention(author.id)}!`;
      }
    }

    return Promise.resolve({
      options: {
        split: false,
      },
      response: this._getReplyWithEnvPrefix(response),
    });
  }

  private _getReplyWithEnvPrefix(response: Readonly<string>): string {
    if (!AppConfigService.getInstance().isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: ProfileConfigService.getInstance().getDiscordId(),
        message: response,
        nickname: ProfileConfigService.getInstance().getNickname(),
      });
    }

    return response;
  }
}
