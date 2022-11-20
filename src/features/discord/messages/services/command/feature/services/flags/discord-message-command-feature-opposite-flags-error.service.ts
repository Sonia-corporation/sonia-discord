import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { wrapInBold } from '../../../../../../../../functions/formatters/wrap-in-bold';
import { IDiscordCommandFlagOpposite } from '../../../../../interfaces/commands/flags/discord-command-flag-opposite';
import { IDiscordMessageResponse } from '../../../../../interfaces/discord-message-response';
import { IDiscordCommandFlagsOpposite } from '../../../../../types/commands/flags/discord-command-flags-opposite';
import { DiscordMessageCommandCliErrorService } from '../../../discord-message-command-cli-error.service';
import { DiscordMessageCommandFeatureErrorCoreService } from '../discord-message-command-feature-error-core.service';
import { EmbedFieldData, MessageEmbedOptions } from 'discord.js';
import _ from 'lodash';

const ONE_FLAG = 1;

export class DiscordMessageCommandFeatureOppositeFlagsErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureOppositeFlagsErrorService;

  public static getInstance(): DiscordMessageCommandFeatureOppositeFlagsErrorService {
    if (_.isNil(DiscordMessageCommandFeatureOppositeFlagsErrorService._instance)) {
      DiscordMessageCommandFeatureOppositeFlagsErrorService._instance =
        new DiscordMessageCommandFeatureOppositeFlagsErrorService();
    }

    return DiscordMessageCommandFeatureOppositeFlagsErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_OPPOSITE_FLAGS_ERROR_SERVICE);
  }

  public getMessageResponse(oppositeFlags: IDiscordCommandFlagsOpposite): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then((cliErrorMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(oppositeFlags)],
          },
        };

        return Promise.resolve(_.merge(cliErrorMessageResponse, message));
      });
  }

  private _getMessageEmbed(oppositeFlags: IDiscordCommandFlagsOpposite): MessageEmbedOptions {
    return {
      description: this._getMessageEmbedDescription(oppositeFlags),
      fields: this._getMessageEmbedFields(oppositeFlags),
      footer: this._getMessageEmbedFooter(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedDescription(oppositeFlags: IDiscordCommandFlagsOpposite): string {
    const oppositeFlagsCount: number = this._getOppositeFlagsCount(oppositeFlags);

    return `${wrapInBold(oppositeFlagsCount)} opposite flag error${
      _.gt(oppositeFlagsCount, ONE_FLAG) ? `s` : ``
    } found.`;
  }

  private _getOppositeFlagsCount(oppositeFlags: IDiscordCommandFlagsOpposite): number {
    return _.size(oppositeFlags);
  }

  private _getMessageEmbedFields(oppositeFlags: IDiscordCommandFlagsOpposite): EmbedFieldData[] {
    return _.concat(
      _.map(oppositeFlags, ({ name, description }: IDiscordCommandFlagOpposite): EmbedFieldData => {
        return {
          inline: false,
          name,
          value: description,
        };
      }),
      this._getMessageEmbedHintField()
    );
  }

  private _getMessageEmbedHintField(): EmbedFieldData {
    return {
      name: `How to solve this?`,
      value: `I am here to help you but do not mess with me!\nTry again but remove the extra opposite flags which makes no sense since you can not combine them!\nAlso you can use the \`--help\` flag if want my help!`,
    };
  }
}
