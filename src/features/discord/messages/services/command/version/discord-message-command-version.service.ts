import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { ellipsis } from '../../../../../../functions/formatters/ellipsis';
import { AppProductionStateEnum } from '../../../../../app/enums/app-production-state.enum';
import { AppConfigQueryService } from '../../../../../app/services/config/app-config-query.service';
import { AppConfigService } from '../../../../../app/services/config/app-config.service';
import { DiscordChannelEnum } from '../../../../channels/enums/discord-channel.enum';
import { DiscordSoniaEmotionalStateEnum } from '../../../../emotional-states/enums/discord-sonia-emotional-state.enum';
import { DiscordSoniaEmotionalStateService } from '../../../../emotional-states/services/discord-sonia-emotional-state.service';
import { DiscordSoniaService } from '../../../../users/services/discord-sonia.service';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { discordHasThisCommand } from '../../../functions/commands/checks/discord-has-this-command';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { DiscordMessageCommandCoreService } from '../discord-message-command-core.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

const BIRTHDAY_CARD_VALUE_LIMIT = 900;

export class DiscordMessageCommandVersionService extends DiscordMessageCommandCoreService {
  private static _instance: DiscordMessageCommandVersionService;
  public static getInstance(): DiscordMessageCommandVersionService {
    if (_.isNil(DiscordMessageCommandVersionService._instance)) {
      DiscordMessageCommandVersionService._instance = new DiscordMessageCommandVersionService();
    }

    return DiscordMessageCommandVersionService._instance;
  }

  public readonly allowedChannels: Set<DiscordChannelEnum> = new Set<DiscordChannelEnum>([
    DiscordChannelEnum.DM,
    DiscordChannelEnum.TEXT,
    DiscordChannelEnum.THREAD,
  ]);
  protected readonly _commandName: string = `version`;

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE);
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      options: {
        embeds: [this._getMessageEmbed()],
      },
    };

    return Promise.resolve(message);
  }

  public hasCommand(message: string): boolean {
    return discordHasThisCommand({
      commands: [DiscordMessageCommandEnum.VERSION, DiscordMessageCommandEnum.V],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
  }

  private _getMessageEmbed(): APIEmbed {
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

  private _getMessageEmbedAuthor(): APIEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): APIEmbedImage {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandVersionImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): APIEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();
    const totalReleaseCountHumanized: string =
      AppConfigQueryService.getInstance().getTotalReleaseCountHumanized(`birthday`);
    const firstReleaseDate: string =
      AppConfigQueryService.getInstance().getFirstReleaseDateFormatted(`[the ]Do MMMM YYYY`);

    return {
      icon_url: soniaImageUrl ?? undefined,
      text: `${totalReleaseCountHumanized} since ${firstReleaseDate}`,
    };
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandVersionImageColor();
  }

  private _getMessageEmbedTimestamp(): string {
    return moment().toISOString();
  }

  private _getMessageEmbedTitle(): string {
    const soniaFullName: string | null = DiscordSoniaService.getInstance().getFullName();

    return `${_.toString(soniaFullName)} version`;
  }

  private _getMessageEmbedFields(): APIEmbedField[] {
    return [
      this._getMessageEmbedFieldApplicationVersion(),
      this._getMessageEmbedFieldReleaseDate(),
      this._getMessageEmbedFieldInitializationDate(),
      this._getMessageEmbedFieldReleaseNotes(),
      this._getMessageEmbedFieldStatus(),
      this._getMessageEmbedFieldEmotionalState(),
    ];
  }

  private _getMessageEmbedFieldApplicationVersion(): APIEmbedField {
    const appVersion: string = AppConfigService.getInstance().getVersion();

    return {
      inline: false,
      name: `My age`,
      value: `[${appVersion}](https://github.com/Sonia-corporation/sonia-discord/releases/tag/${appVersion})`,
    };
  }

  private _getMessageEmbedFieldReleaseDate(): APIEmbedField {
    return {
      inline: false,
      name: `My last birthday`,
      value: AppConfigQueryService.getInstance().getReleaseDateHumanized(),
    };
  }

  private _getMessageEmbedFieldInitializationDate(): APIEmbedField {
    return {
      inline: false,
      name: `The last time I woken up`,
      value: AppConfigQueryService.getInstance().getInitializationDateHumanized(),
    };
  }

  private _getMessageEmbedFieldReleaseNotes(): APIEmbedField {
    const appReleaseNotes: string = AppConfigService.getInstance().getReleaseNotes();

    return {
      inline: false,
      name: `My birthday card`,
      value: `${ellipsis(
        appReleaseNotes,
        BIRTHDAY_CARD_VALUE_LIMIT
      )}\n\nCheckout all my [birthday cards](https://github.com/Sonia-corporation/sonia-discord/blob/master/CHANGELOG.md).`,
    };
  }

  private _getMessageEmbedFieldStatus(): APIEmbedField {
    const appProductionStateHumanized: AppProductionStateEnum =
      AppConfigQueryService.getInstance().getProductionStateHumanized();

    return {
      inline: false,
      name: `My location`,
      value: `Running in ${appProductionStateHumanized}`,
    };
  }

  private _getMessageEmbedFieldEmotionalState(): APIEmbedField {
    const soniaEmotionalState: DiscordSoniaEmotionalStateEnum | undefined =
      DiscordSoniaEmotionalStateService.getInstance().getEmotionalState();

    return {
      inline: false,
      name: `My emotional state`,
      value: _.capitalize(soniaEmotionalState),
    };
  }
}
