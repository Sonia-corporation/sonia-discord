import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { ellipsis } from "../../../../../../functions/formatters/ellipsis";
import { AppProductionStateEnum } from "../../../../../app/enums/app-production-state.enum";
import { AppConfigQueryService } from "../../../../../app/services/config/app-config-query.service";
import { AppConfigService } from "../../../../../app/services/config/app-config.service";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordSoniaEmotionalStateEnum } from "../../../../emotional-states/enums/discord-sonia-emotional-state.enum";
import { DiscordSoniaEmotionalStateService } from "../../../../emotional-states/services/discord-sonia-emotional-state.service";
import { DiscordSoniaService } from "../../../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandVersionService extends AbstractService {
  private static _instance: DiscordMessageCommandVersionService;

  public static getInstance(): DiscordMessageCommandVersionService {
    if (_.isNil(DiscordMessageCommandVersionService._instance)) {
      DiscordMessageCommandVersionService._instance = new DiscordMessageCommandVersionService();
    }

    return DiscordMessageCommandVersionService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();
  private readonly _appConfigQueryService: AppConfigQueryService = AppConfigQueryService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordSoniaEmotionalStateService: DiscordSoniaEmotionalStateService = DiscordSoniaEmotionalStateService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE);
  }

  public handleResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._serviceName,
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
    return {
      url: this._discordMessageConfigService.getMessageCommandVersionImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();
    const totalReleaseCountHumanized: string = this._appConfigQueryService.getTotalReleaseCountHumanized(
      `birthday`
    );
    const firstReleaseDate: string = this._appConfigQueryService.getFirstReleaseDateFormatted(
      `[the ]Do MMMM YYYY`
    );

    return {
      iconURL: soniaImageUrl || undefined,
      text: `${totalReleaseCountHumanized} since ${firstReleaseDate}`,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandVersionImageColor();
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
      | undefined = this._discordSoniaEmotionalStateService.getEmotionalState();

    return {
      inline: true,
      name: `My emotional state`,
      value: _.capitalize(soniaEmotionalState),
    };
  }
}
