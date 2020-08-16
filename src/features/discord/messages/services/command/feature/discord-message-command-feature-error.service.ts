import {
  EmbedFieldData,
  MessageEmbedFooter,
  MessageEmbedOptions,
} from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { GithubConfigService } from "../../../../../github/services/config/github-config.service";
import { DiscordEmojiEnum } from "../../../../enums/discord-emoji.enum";
import { DiscordGuildConfigService } from "../../../../guilds/services/config/discord-guild-config.service";
import { DiscordSoniaService } from "../../../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { DiscordMessageCommandCliErrorService } from "../discord-message-command-cli-error.service";

export class DiscordMessageCommandFeatureErrorService extends AbstractService {
  private static _instance: DiscordMessageCommandFeatureErrorService;

  public static getInstance(): DiscordMessageCommandFeatureErrorService {
    if (_.isNil(DiscordMessageCommandFeatureErrorService._instance)) {
      DiscordMessageCommandFeatureErrorService._instance = new DiscordMessageCommandFeatureErrorService();
    }

    return DiscordMessageCommandFeatureErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_ERROR_SERVICE);
  }

  public getEmptyContentErrorMessageResponse(): Promise<
    IDiscordMessageResponse
  > {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then(
        (
          cliErrorMessageResponse: Readonly<IDiscordMessageResponse>
        ): Promise<IDiscordMessageResponse> => {
          return Promise.resolve(
            _.merge(cliErrorMessageResponse, {
              options: {
                embed: this._getEmptyContentErrorMessageEmbed(),
                split: true,
              },
              response: ``,
            } as IDiscordMessageResponse)
          );
        }
      );
  }

  private _getEmptyContentErrorMessageEmbed(): MessageEmbedOptions {
    return {
      fields: this._getEmptyContentErrorMessageEmbedFields(),
      footer: this._getEmptyContentErrorMessageEmbedFooter(),
      title: this._getEmptyContentErrorMessageEmbedTitle(),
    };
  }

  private _getEmptyContentErrorMessageEmbedFields(): EmbedFieldData[] {
    return [
      this._getEmptyContentErrorMessageEmbedFieldError(),
      this._getEmptyContentErrorMessageEmbedFieldErrorReport(),
    ];
  }

  private _getEmptyContentErrorMessageEmbedFieldError(): EmbedFieldData {
    return {
      name: `Empty content`,
      value: `The content of the message is empty ${DiscordEmojiEnum.THINKING}. I can not process the feature command however this error should never happen ${DiscordEmojiEnum.WARNING}! Do not be so selfish and share this information with my creators ${DiscordEmojiEnum.PRAY}!`,
    };
  }

  private _getEmptyContentErrorMessageEmbedFieldErrorReport(): EmbedFieldData {
    const githubBugReportUrl: string = GithubConfigService.getInstance().getBugReportUrl();
    const discordSoniaPermanentGuildInviteUrl: string = DiscordGuildConfigService.getInstance().getSoniaPermanentGuildInviteUrl();

    return {
      name: `Help me to help you`,
      value: `You can create a [bug report](${githubBugReportUrl}) or reach my creators on [discord](${discordSoniaPermanentGuildInviteUrl}).`,
    };
  }

  private _getEmptyContentErrorMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Invalid feature command`,
    };
  }

  private _getEmptyContentErrorMessageEmbedTitle(): string {
    return `I can not handle your request ${DiscordEmojiEnum.WORRIED}`;
  }
}
