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
import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";
import { discordHasThisCommand } from "../../../functions/commands/checks/discord-has-this-command";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandErrorService extends AbstractService {
  private static _instance: DiscordMessageCommandErrorService;

  public static getInstance(): DiscordMessageCommandErrorService {
    if (_.isNil(DiscordMessageCommandErrorService._instance)) {
      DiscordMessageCommandErrorService._instance = new DiscordMessageCommandErrorService();
    }

    return DiscordMessageCommandErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_ERROR_SERVICE);
  }

  public handleResponse({
    id,
  }: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        id,
        `error command detected`
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
        DiscordMessageCommandEnum.ERROR,
        DiscordMessageCommandEnum.BUG,
      ],
      message,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });
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
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return [this._getMessageEmbedFieldBait(), this._getMessageEmbedFieldHint()];
  }

  private _getMessageEmbedFieldBait(): EmbedFieldData {
    return {
      name: `It seems that something went wrong`,
      value: `You may have found an issue with my internal core system.
      Please, inform my creator as soon as possible!
      This could lead to a very critical failure for myself and I do not wish to die!!`,
    };
  }

  private _getMessageEmbedFieldHint(): EmbedFieldData {
    return {
      name: `Come again?`,
      value: `What do you think you are doing here?
      That is not the way it works!
      Get back to work you peasant.`,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Nice try though`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Uh-oh. What just happened?`;
  }
}
