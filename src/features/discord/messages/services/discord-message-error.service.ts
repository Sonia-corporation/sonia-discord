import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { ellipsis } from "../../../../functions/formatters/ellipsis";
import { GithubConfigService } from "../../../github/services/config/github-config.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordChannelService } from "../../channels/services/discord-channel.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildConfigService } from "../../guilds/services/config/discord-guild-config.service";
import { DiscordGuildSoniaService } from "../../guilds/services/discord-guild-sonia.service";
import { DiscordSoniaService } from "../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessageConfigService } from "./config/discord-message-config.service";

export class DiscordMessageErrorService extends AbstractService {
  private static _instance: DiscordMessageErrorService;

  public static getInstance(): DiscordMessageErrorService {
    if (_.isNil(DiscordMessageErrorService._instance)) {
      DiscordMessageErrorService._instance = new DiscordMessageErrorService();
    }

    return DiscordMessageErrorService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordChannelService: DiscordChannelService = DiscordChannelService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _githubConfigService: GithubConfigService = GithubConfigService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_ERROR_SERVICE);
  }

  public handleError(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): void {
    this._logOnError(error, anyDiscordMessage);
    this._sendMessage(error, anyDiscordMessage);
  }

  private _sendMessage(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(
      error,
      anyDiscordMessage
    );

    this._sendMessageToOriginalChannel(anyDiscordMessage, messageResponse);
    this._sendMessageToSoniaDiscord(messageResponse);
  }

  private _sendMessageToOriginalChannel(
    anyDiscordMessage: Readonly<AnyDiscordMessage>,
    messageResponse: Readonly<IDiscordMessageResponse>
  ): void {
    if (this._discordChannelService.isValid(anyDiscordMessage.channel)) {
      anyDiscordMessage.channel
        .send(messageResponse.response, messageResponse.options)
        .then((): void => {
          this._loggerService.log({
            context: this._serviceName,
            extendedContext: true,
            message: this._loggerService.getSnowflakeContext(
              anyDiscordMessage.id,
              `message sent`
            ),
          });
        })
        .catch((error: unknown): void => {
          this._logOnError(error, anyDiscordMessage);
        });
    }
  }

  private _sendMessageToSoniaDiscord(
    messageResponse: Readonly<IDiscordMessageResponse>
  ): void {
    this._discordGuildSoniaService.sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse: messageResponse,
    });
  }

  private _logOnError(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): void {
    this._loggerService.error({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `message sending failed`
      ),
    });
    this._loggerService.error({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        error
      ),
    });
  }

  private _getMessageResponse(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._getErrorMessageResponse(error, anyDiscordMessage);
  }

  private _getErrorMessageResponse(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getMessageEmbed(error, anyDiscordMessage),
        split: true,
      },
      response: ``,
    };
  }

  private _getMessageEmbed(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      fields: this._getMessageEmbedFields(error, anyDiscordMessage),
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
      url: this._discordMessageConfigService.getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `I am very sorry for that`,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Oops, you have found a bug`;
  }

  private _getMessageEmbedFields(
    error: unknown,
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldMessageId(anyDiscordMessage),
      this._getMessageEmbedFieldError(error),
      this._getMessageEmbedFieldHint(),
    ];
  }

  private _getMessageEmbedFieldMessageId(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): EmbedFieldData {
    return {
      name: `The message's id that killed me`,
      value: anyDiscordMessage.id,
    };
  }

  private _getMessageEmbedFieldError(error: unknown): EmbedFieldData {
    return {
      name: `My blood trace`,
      value: ellipsis(_.toString(error)),
    };
  }

  private _getMessageEmbedFieldHint(): EmbedFieldData {
    const githubBugReportUrl: string = this._githubConfigService.getBugReportUrl();
    const discordSoniaPermanentGuildInviteUrl: string = this._discordGuildConfigService.getSoniaPermanentGuildInviteUrl();

    return {
      name: `Help me to help you`,
      value: `You can create a [bug report](${githubBugReportUrl}) or reach my creators on [discord](${discordSoniaPermanentGuildInviteUrl}).`,
    };
  }
}
