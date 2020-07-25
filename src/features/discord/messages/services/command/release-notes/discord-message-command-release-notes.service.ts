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
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandReleaseNotesService extends AbstractService {
  private static _instance: DiscordMessageCommandReleaseNotesService;

  public static getInstance(): DiscordMessageCommandReleaseNotesService {
    if (_.isNil(DiscordMessageCommandReleaseNotesService._instance)) {
      DiscordMessageCommandReleaseNotesService._instance = new DiscordMessageCommandReleaseNotesService();
    }

    return DiscordMessageCommandReleaseNotesService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();
  private readonly _appConfigQueryService: AppConfigQueryService = AppConfigQueryService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_RELEASE_NOTES_SERVICE);
  }

  public handleResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `release notes command detected`
      ),
    });

    return {
      options: {
        embed: this._getMessageEmbed(),
        split: true,
      },
      response: ``,
    };
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
    return this._discordSoniaService.getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: this._discordMessageConfigService.getMessageCommandReleaseNotesImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();
    const totalReleaseCountHumanized: string = this._appConfigQueryService.getTotalReleaseCountHumanized();
    const firstReleaseDate: string = this._appConfigQueryService.getFirstReleaseDateFormatted(
      `[the ]Do MMMM YYYY`
    );

    return {
      iconURL: soniaImageUrl || undefined,
      text: `${totalReleaseCountHumanized} since ${firstReleaseDate}`,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandReleaseNotesImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    const appVersion: string = this._appConfigService.getVersion();

    return `**${appVersion}** release notes - ${this._appConfigQueryService.getReleaseDateHumanized()}`;
  }

  private _getMessageDescription(): string {
    const appReleaseNotes: string = this._appConfigService.getReleaseNotes();

    return `${appReleaseNotes}\n\nCheckout all the [release notes](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md).`;
  }
}
