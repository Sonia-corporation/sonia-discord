import { EmbedFieldData, MessageEmbedOptions } from "discord.js";
import _ from "lodash";
import { ServiceNameEnum } from "../../../../../../../../enums/service-name.enum";
import { wrapInBold } from "../../../../../../../../functions/formatters/wrap-in-bold";
import { IDiscordCommandFlagDuplicated } from "../../../../../interfaces/commands/flags/discord-command-flag-duplicated";
import { IDiscordMessageResponse } from "../../../../../interfaces/discord-message-response";
import { IDiscordCommandFlagsDuplicated } from "../../../../../types/commands/flags/discord-command-flags-duplicated";
import { DiscordMessageCommandCliErrorService } from "../../../discord-message-command-cli-error.service";
import { DiscordMessageCommandFeatureErrorCoreService } from "../discord-message-command-feature-error-core.service";

const ONE_FLAG_DUPLICATED = 1;

export class DiscordMessageCommandFeatureDuplicatedFlagsErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureDuplicatedFlagsErrorService;

  public static getInstance(): DiscordMessageCommandFeatureDuplicatedFlagsErrorService {
    if (
      _.isNil(DiscordMessageCommandFeatureDuplicatedFlagsErrorService._instance)
    ) {
      DiscordMessageCommandFeatureDuplicatedFlagsErrorService._instance = new DiscordMessageCommandFeatureDuplicatedFlagsErrorService();
    }

    return DiscordMessageCommandFeatureDuplicatedFlagsErrorService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_DUPLICATED_FLAGS_ERROR_SERVICE
    );
  }

  public getMessageResponse(
    flagsDuplicated: Readonly<IDiscordCommandFlagsDuplicated>
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then(
        (
          cliErrorMessageResponse: Readonly<IDiscordMessageResponse>
        ): Promise<IDiscordMessageResponse> =>
          Promise.resolve(
            _.merge(cliErrorMessageResponse, {
              options: {
                embed: this._getMessageEmbed(flagsDuplicated),
                split: true,
              },
              response: ``,
            } as IDiscordMessageResponse)
          )
      );
  }

  private _getMessageEmbed(
    flagsDuplicated: Readonly<IDiscordCommandFlagsDuplicated>
  ): MessageEmbedOptions {
    return {
      description: this._getMessageEmbedDescription(flagsDuplicated),
      fields: this._getMessageEmbedFields(flagsDuplicated),
      footer: this._getMessageEmbedFooter(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedDescription(
    flagsDuplicated: Readonly<IDiscordCommandFlagsDuplicated>
  ): string {
    const flagsDuplicatedCount: number = this._getFlagsDuplicatedCount(
      flagsDuplicated
    );

    return `${wrapInBold(flagsDuplicatedCount)} duplicated flag${
      _.gt(flagsDuplicatedCount, ONE_FLAG_DUPLICATED) ? `s` : ``
    } found.`;
  }

  private _getMessageEmbedFields(
    flagsDuplicated: Readonly<IDiscordCommandFlagsDuplicated>
  ): EmbedFieldData[] {
    return _.map(
      flagsDuplicated,
      ({
        name,
        description,
      }: Readonly<IDiscordCommandFlagDuplicated>): EmbedFieldData => {
        return {
          inline: true,
          name,
          value: description,
        };
      }
    );
  }

  private _getFlagsDuplicatedCount(
    flagsDuplicated: Readonly<IDiscordCommandFlagsDuplicated>
  ): number {
    return _.size(flagsDuplicated);
  }
}
