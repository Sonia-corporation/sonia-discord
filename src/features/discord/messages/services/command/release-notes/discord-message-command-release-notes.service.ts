import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { AppConfigQueryService } from "../../../../../app/services/config/app-config-query.service";
import { AppConfigService } from "../../../../../app/services/config/app-config.service";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordSoniaService } from "../../../../users/services/discord-sonia.service";
import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";
import { discordHasThisCommand } from "../../../functions/commands/checks/discord-has-this-command";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandReleaseNotesService extends AbstractService {
  private static _instance: DiscordMessageCommandReleaseNotesService;

  public static getInstance(): DiscordMessageCommandReleaseNotesService {
    if (_.isNil(DiscordMessageCommandReleaseNotesService._instance)) {
      DiscordMessageCommandReleaseNotesService._instance = new DiscordMessageCommandReleaseNotesService();
    }

    return DiscordMessageCommandReleaseNotesService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_RELEASE_NOTES_SERVICE);
  }

  public handleResponse({
    id,
  }: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `release notes command detected`
      ),
    });

    return this.getMessageResponse();
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse> {
    return Promise.resolve({
      options: {
        embed: this._getMessageEmbed(),
        split: true,
      },
      response: ``,
    });
  }

  public hasCommand(message: Readonly<string>): boolean {
    return discordHasThisCommand({
      commands: [
        DiscordMessageCommandEnum.RELEASE_NOTES,
        DiscordMessageCommandEnum.R,
      ],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getMessageEmbed(): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageDescription(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = DiscordSoniaService.getInstance().getImageUrl();
    const totalReleaseCountHumanized: string = AppConfigQueryService.getInstance().getTotalReleaseCountHumanized();
    const firstReleaseDate: string = AppConfigQueryService.getInstance().getFirstReleaseDateFormatted(
      `[the ]Do MMMM YYYY`
    );

    return {
      iconURL: soniaImageUrl || undefined,
      text: `${totalReleaseCountHumanized} since ${firstReleaseDate}`,
    };
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandReleaseNotesImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    return `**${appVersion}** release notes - ${AppConfigQueryService.getInstance().getReleaseDateHumanized()}`;
  }

  private _getMessageDescription(): string {
    const appReleaseNotes: string = AppConfigService.getInstance().getReleaseNotes();

    return `${appReleaseNotes}\n\nCheckout all the [release notes](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md).`;
  }
}
