import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { DiscordChannelEnum } from '../../../../channels/enums/discord-channel.enum';
import { DiscordSoniaService } from '../../../../users/services/discord-sonia.service';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { discordHasThisCommand } from '../../../functions/commands/checks/discord-has-this-command';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../../config/discord-message-config.service';
import { DiscordMessageCommandCoreService } from '../discord-message-command-core.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageCommandErrorService extends DiscordMessageCommandCoreService {
  private static _instance: DiscordMessageCommandErrorService;

  public static getInstance(): DiscordMessageCommandErrorService {
    if (_.isNil(DiscordMessageCommandErrorService._instance)) {
      DiscordMessageCommandErrorService._instance = new DiscordMessageCommandErrorService();
    }

    return DiscordMessageCommandErrorService._instance;
  }

  public readonly allowedChannels: Set<DiscordChannelEnum> = new Set<DiscordChannelEnum>([
    DiscordChannelEnum.DM,
    DiscordChannelEnum.TEXT,
    DiscordChannelEnum.THREAD,
  ]);
  protected readonly _commandName: string = `error`;

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_ERROR_SERVICE);
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
      commands: [DiscordMessageCommandEnum.ERROR, DiscordMessageCommandEnum.BUG],
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

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedFields(): APIEmbedField[] {
    return [this._getMessageEmbedFieldBait(), this._getMessageEmbedFieldHint()];
  }

  private _getMessageEmbedFieldBait(): APIEmbedField {
    return {
      inline: false,
      name: `It seems that something went wrong`,
      value: `You may have found an issue with my internal core system.
      Please, inform my creator as soon as possible!
      This could lead to a very critical failure for myself and I do not wish to die!!`,
    };
  }

  private _getMessageEmbedFieldHint(): APIEmbedField {
    return {
      inline: false,
      name: `Come again?`,
      value: `What do you think you are doing here?
      That is not the way it works!
      Get back to work you peasant.`,
    };
  }

  private _getMessageEmbedFooter(): APIEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      icon_url: soniaImageUrl ?? undefined,
      text: `Nice try though`,
    };
  }

  private _getMessageEmbedThumbnail(): APIEmbedImage {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): string {
    return moment().toISOString();
  }

  private _getMessageEmbedTitle(): string {
    return `Uh-oh. What just happened?`;
  }
}
