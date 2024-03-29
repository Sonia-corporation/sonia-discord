import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { wrapInBold } from '../../../../../../../../functions/formatters/wrap-in-bold';
import { IDiscordCommandFlagDuplicated } from '../../../../../interfaces/commands/flags/discord-command-flag-duplicated';
import { IDiscordMessageResponse } from '../../../../../interfaces/discord-message-response';
import { IDiscordCommandFlagsDuplicated } from '../../../../../types/commands/flags/discord-command-flags-duplicated';
import { DiscordMessageCommandCliErrorService } from '../../../discord-message-command-cli-error.service';
import { DiscordMessageCommandFeatureErrorCoreService } from '../discord-message-command-feature-error-core.service';
import { APIEmbed, APIEmbedField } from 'discord.js';
import _ from 'lodash';

const ONE_FLAG_DUPLICATED = 1;

export class DiscordMessageCommandFeatureDuplicatedFlagsErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureDuplicatedFlagsErrorService;

  public static getInstance(): DiscordMessageCommandFeatureDuplicatedFlagsErrorService {
    if (_.isNil(DiscordMessageCommandFeatureDuplicatedFlagsErrorService._instance)) {
      DiscordMessageCommandFeatureDuplicatedFlagsErrorService._instance =
        new DiscordMessageCommandFeatureDuplicatedFlagsErrorService();
    }

    return DiscordMessageCommandFeatureDuplicatedFlagsErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_DUPLICATED_FLAGS_ERROR_SERVICE);
  }

  public getMessageResponse(flagsDuplicated: IDiscordCommandFlagsDuplicated): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then((cliErrorMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(flagsDuplicated)],
          },
        };

        return Promise.resolve(_.merge(cliErrorMessageResponse, message));
      });
  }

  private _getMessageEmbed(flagsDuplicated: IDiscordCommandFlagsDuplicated): APIEmbed {
    return {
      description: this._getMessageEmbedDescription(flagsDuplicated),
      fields: this._getMessageEmbedFields(flagsDuplicated),
      footer: this._getMessageEmbedFooter(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedDescription(flagsDuplicated: IDiscordCommandFlagsDuplicated): string {
    const flagsDuplicatedCount: number = this._getFlagsDuplicatedCount(flagsDuplicated);

    return `${wrapInBold(flagsDuplicatedCount)} duplicated flag${
      _.gt(flagsDuplicatedCount, ONE_FLAG_DUPLICATED) ? `s` : ``
    } found.`;
  }

  private _getFlagsDuplicatedCount(flagsDuplicated: IDiscordCommandFlagsDuplicated): number {
    return _.size(flagsDuplicated);
  }

  private _getMessageEmbedFields(flagsDuplicated: IDiscordCommandFlagsDuplicated): APIEmbedField[] {
    return _.concat(
      _.map(flagsDuplicated, ({ name, description }: IDiscordCommandFlagDuplicated): APIEmbedField => {
        return {
          inline: false,
          name,
          value: description,
        };
      }),
      this._getMessageEmbedHintField()
    );
  }

  private _getMessageEmbedHintField(): APIEmbedField {
    return {
      inline: false,
      name: `How to solve this?`,
      value: `I am here to help you but do not mess with me!\nTry again but remove the extra duplicated flags and then we can talk.`,
    };
  }
}
