import { DiscordMessageCommandFeatureNoonConfigService } from './config/discord-message-command-feature-noon-config.service';
import { ServiceNameEnum } from '../../../../../../../../../enums/service-name.enum';
import { wrapInBold } from '../../../../../../../../../functions/formatters/wrap-in-bold';
import { DiscordChannelEnum } from '../../../../../../../channels/enums/discord-channel.enum';
import { DiscordSoniaService } from '../../../../../../../users/services/discord-sonia.service';
import { IDiscordCommandSplittedFlagsResponse } from '../../../../../../classes/commands/flags/discord-command-splitted-flags-response';
import { discordCommandSplitFlagsResponse } from '../../../../../../functions/commands/flags/discord-command-split-flags-response';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { IDiscordCommandFlagsResponse } from '../../../../../../types/commands/flags/discord-command-flags-response';
import { IDiscordCommandFlagsSuccess } from '../../../../../../types/commands/flags/discord-command-flags-success';
import { DiscordMessageSubCommandCoreService } from '../../../../discord-message-sub-command-core.service';
import { DiscordMessageCommandFeatureNameEnum } from '../../../enums/discord-message-command-feature-name.enum';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from '../constants/discord-message-command-feature-noon-flags';
import { IDiscordMessageCommandFeatureNameNoon } from '../types/discord-message-command-feature-name-noon';
import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

const ONE_FLAG_SUCCESS = 1;

export class DiscordMessageCommandFeatureNoonService extends DiscordMessageSubCommandCoreService {
  private static _instance: DiscordMessageCommandFeatureNoonService;

  public static getInstance(): DiscordMessageCommandFeatureNoonService {
    if (_.isNil(DiscordMessageCommandFeatureNoonService._instance)) {
      DiscordMessageCommandFeatureNoonService._instance = new DiscordMessageCommandFeatureNoonService();
    }

    return DiscordMessageCommandFeatureNoonService._instance;
  }

  public readonly allowedChannels: Set<DiscordChannelEnum> = new Set<DiscordChannelEnum>([
    DiscordChannelEnum.DM,
    DiscordChannelEnum.TEXT,
  ]);

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE);
  }

  public isNoonFeature(
    featureName: string | DiscordMessageCommandFeatureNameEnum
  ): featureName is IDiscordMessageCommandFeatureNameNoon {
    return (
      featureName === DiscordMessageCommandFeatureNameEnum.NOON ||
      featureName === DiscordMessageCommandFeatureNameEnum.N
    );
  }

  /**
   * @description
   * This method should be called once the message command was validated entirely.
   * Including checking that all flags were valid.
   * It will trigger the action on flags.
   * Then return a response.
   * @param   {IAnyDiscordMessage}                 anyDiscordMessage Original message.
   * @param   {string}                             messageFlags      A partial message containing only a string with flags.
   * @returns {Promise<IDiscordMessageResponse[]>}                   Some embed message to respond.
   */
  public getMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    messageFlags: string
  ): Promise<IDiscordMessageResponse[]> {
    return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.executeAll(anyDiscordMessage, messageFlags).then(
      (discordCommandFlagsResponse: IDiscordCommandFlagsResponse): Promise<IDiscordMessageResponse[]> => {
        const discordCommandSplittedFlagsResponse: IDiscordCommandSplittedFlagsResponse =
          discordCommandSplitFlagsResponse(discordCommandFlagsResponse);
        const discordMessageResponses: IDiscordMessageResponse[] = discordCommandSplittedFlagsResponse.messageResponses;

        if (!_.isEmpty(discordCommandSplittedFlagsResponse.commandFlagsSuccess)) {
          discordMessageResponses.unshift({
            options: {
              embeds: [this._getMessageEmbed(discordCommandSplittedFlagsResponse.commandFlagsSuccess)],
            },
          });
        }

        return Promise.all(
          _.map(
            discordMessageResponses,
            (discordMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> =>
              Promise.resolve(discordMessageResponse)
          )
        );
      }
    );
  }

  private _getMessageEmbed(flagsSuccess: IDiscordCommandFlagsSuccess): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageEmbedDescription(flagsSuccess),
      fields: this._getMessageEmbedFields(flagsSuccess),
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
    return DiscordMessageCommandFeatureNoonConfigService.getInstance().getNoonConfigImageColor();
  }

  private _getMessageEmbedDescription(flagsSuccess: IDiscordCommandFlagsSuccess): string {
    const flagsSuccessCount: number = this._getFlagsSuccessCount(flagsSuccess);

    return `${wrapInBold(flagsSuccessCount)} noon feature option${
      _.gt(flagsSuccessCount, ONE_FLAG_SUCCESS) ? `s` : ``
    } updated.`;
  }

  private _getFlagsSuccessCount(flagsSuccess: IDiscordCommandFlagsSuccess): number {
    return _.size(flagsSuccess);
  }

  private _getMessageEmbedFields(flagsSuccess: IDiscordCommandFlagsSuccess): EmbedFieldData[] {
    return _.map(flagsSuccess, ({ name, description }: IDiscordCommandFlagSuccess): EmbedFieldData => {
      return {
        inline: false,
        name,
        value: description,
      };
    });
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `Noon feature successfully updated`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageCommandFeatureNoonConfigService.getInstance().getNoonConfigImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Noon feature updated.`;
  }
}
