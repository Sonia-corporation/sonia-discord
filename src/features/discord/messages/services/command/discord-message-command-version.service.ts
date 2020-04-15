import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment";
import { ellipsis } from "../../../../../functions/formatters/ellipsis";
import { AppProductionStateEnum } from "../../../../app/enums/app-production-state.enum";
import { AppConfigQueryService } from "../../../../app/services/config/app-config-query.service";
import { AppConfigService } from "../../../../app/services/config/app-config.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { DiscordSoniaEmotionalStateEnum } from "../../../users/enums/discord-sonia-emotional-state.enum";
import { DiscordSoniaService } from "../../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../types/any-discord-message";
import { DiscordMessageConfigService } from "../config/discord-message-config.service";

export class DiscordMessageCommandVersionService {
  private static _instance: DiscordMessageCommandVersionService;

  public static getInstance(): DiscordMessageCommandVersionService {
    if (_.isNil(DiscordMessageCommandVersionService._instance)) {
      DiscordMessageCommandVersionService._instance = new DiscordMessageCommandVersionService();
    }

    return DiscordMessageCommandVersionService._instance;
  }

  private readonly _appConfigService = AppConfigService.getInstance();
  private readonly _appConfigQueryService = AppConfigQueryService.getInstance();
  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _className = `DiscordMessageCommandVersionService`;

  public handle(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `version command detected`
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
      fields: this._getMessageEmbedFields(),
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
    const discordMessageCommandVersionConfig: IDiscordMessageCommandVersionConfig = this._discordMessageConfigService.getMessageCommandVersion();

    return {
      url: discordMessageCommandVersionConfig.imageUrl,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();
    const totalReleaseCountHumanized: string = this._appConfigQueryService.getTotalReleaseCountHumanized();

    return {
      iconURL: soniaImageUrl || undefined,
      text: totalReleaseCountHumanized,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandVersion()
      .imageColor;
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    const soniaFullName:
      | string
      | null = this._discordSoniaService.getFullName();

    return `${soniaFullName} version`;
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldApplicationVersion(),
      this._getMessageEmbedFieldReleaseDate(),
      this._getMessageEmbedFieldInitializationDate(),
      this._getMessageEmbedFieldReleaseNotes(),
      this._getMessageEmbedFieldStatus(),
      this._getMessageEmbedFieldEmotionalState(),
    ];
  }

  private _getMessageEmbedFieldApplicationVersion(): EmbedFieldData {
    const appVersion: string = this._appConfigService.getVersion();

    return {
      name: `My age`,
      value: `[${appVersion}](https://github.com/Sonia-corporation/il-est-midi-discord/releases/tag/${appVersion})`,
    };
  }

  private _getMessageEmbedFieldReleaseDate(): EmbedFieldData {
    return {
      inline: true,
      name: `My last birthday`,
      value: this._appConfigQueryService.getReleaseDateHumanized(),
    };
  }

  private _getMessageEmbedFieldInitializationDate(): EmbedFieldData {
    return {
      inline: true,
      name: `The last time I woken up`,
      value: this._appConfigQueryService.getInitializationDateHumanized(),
    };
  }

  private _getMessageEmbedFieldReleaseNotes(): EmbedFieldData {
    const appReleaseNotes: string = this._appConfigService.getReleaseNotes();

    return {
      name: `My birthday card`,
      value: `${ellipsis(
        appReleaseNotes,
        1000
      )}\n\nCheckout all my [birthday cards](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md).`,
    };
  }

  private _getMessageEmbedFieldStatus(): EmbedFieldData {
    const appProductionStateHumanized: AppProductionStateEnum = this._appConfigQueryService.getProductionStateHumanized();

    return {
      inline: true,
      name: `My location`,
      value: `Running in ${appProductionStateHumanized}`,
    };
  }

  private _getMessageEmbedFieldEmotionalState(): EmbedFieldData {
    const soniaEmotionalState:
      | DiscordSoniaEmotionalStateEnum
      | undefined = this._discordSoniaService.getEmotionalState();

    return {
      inline: true,
      name: `My emotional state`,
      value: _.capitalize(soniaEmotionalState),
    };
  }
}
