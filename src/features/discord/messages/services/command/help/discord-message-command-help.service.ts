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
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordSoniaService } from "../../../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandHelpService extends AbstractService {
  private static _instance: DiscordMessageCommandHelpService;

  public static getInstance(): DiscordMessageCommandHelpService {
    if (_.isNil(DiscordMessageCommandHelpService._instance)) {
      DiscordMessageCommandHelpService._instance = new DiscordMessageCommandHelpService();
    }

    return DiscordMessageCommandHelpService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HELP_SERVICE);
  }

  public handleResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `help command detected`
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

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandHelpImageColor();
  }

  private _getMessageDescription(): string {
    return `Below is the complete list of commands.
    You can either use *-*, *!* or *$* as prefix to run a command.`;
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldCookie(),
      this._getMessageEmbedFieldError(),
      this._getMessageEmbedFieldHelp(),
      this._getMessageEmbedFieldLunch(),
      this._getMessageEmbedFieldReleaseNotes(),
      this._getMessageEmbedFieldVersion(),
      this._getMessageEmbedFieldMoreHelp(),
    ];
  }

  private _getMessageEmbedFieldCookie(): EmbedFieldData {
    return {
      name: `Cookie (*cookie*, *cookies* or *c*)`,
      value: `Because I am good, life gave me cookies. Now it is my turn to give you some.`,
    };
  }

  private _getMessageEmbedFieldError(): EmbedFieldData {
    return {
      name: `Error (*error* or *bug*)`,
      value: `Create a bug in my core system. Do not do this one, of course!`,
    };
  }

  private _getMessageEmbedFieldHelp(): EmbedFieldData {
    return {
      name: `Help (*help* or *h*)`,
      value: `Ask for my help, it is obvious! And maybe I will, who knows?`,
    };
  }

  private _getMessageEmbedFieldLunch(): EmbedFieldData {
    return {
      name: `Lunch (*lunch* or *l*)`,
      value: `There is a time to eat.`,
    };
  }

  private _getMessageEmbedFieldReleaseNotes(): EmbedFieldData {
    return {
      name: `Release notes (*release-notes* or *r*)`,
      value: `Display the last version release notes.`,
    };
  }

  private _getMessageEmbedFieldVersion(): EmbedFieldData {
    return {
      name: `Version (*version* or *v*)`,
      value: `Display my current application version.`,
    };
  }

  private _getMessageEmbedFieldMoreHelp(): EmbedFieldData {
    return {
      name: `Further help`,
      value: `You can also checkout the [readme](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/README.md).
      It contains more information about how I work.`,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `At your service`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: this._discordMessageConfigService.getMessageCommandHelpImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `So, you need my help? Cool.`;
  }
}
