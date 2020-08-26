import { EmbedFieldData, MessageEmbedFooter } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordSoniaService } from "../../../../../users/services/discord-sonia.service";
import { DiscordMessageCommandEnum } from "../../../../enums/commands/discord-message-command.enum";
import { discordGetCommandAndPrefix } from "../../../../functions/commands/getters/discord-get-command-and-prefix";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../../config/discord-message-config.service";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAMES } from "../constants/discord-message-command-feature-names";

/**
 * @description
 * Service in common for other error services
 * Used to avoid code duplication
 */
export abstract class DiscordMessageCommandFeatureErrorCoreService extends AbstractService {
  protected constructor(serviceName: Readonly<ServiceNameEnum>) {
    super(serviceName);
  }

  protected _getErrorMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Invalid feature command`,
    };
  }

  protected _getErrorMessageEmbedTitle(): string {
    return `I can not handle your request`;
  }

  protected _getMessageEmbedFieldErrorAllFeatures(): EmbedFieldData {
    return {
      name: `All features`,
      value: DISCORD_MESSAGE_COMMAND_FEATURE_NAMES.getAllArgumentsNameWithShortcutsExample(),
    };
  }

  protected _getMessageEmbedFieldErrorFeatureExample(
    { content }: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[]
  ): EmbedFieldData {
    const randomFeature:
      | string
      | undefined = DISCORD_MESSAGE_COMMAND_FEATURE_NAMES.getRandomArgumentUsageExample();
    let userCommand: string | null = discordGetCommandAndPrefix({
      commands,
      message: _.isNil(content) ? `` : content,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });

    if (_.isNil(userCommand)) {
      userCommand = `!${_.toLower(DiscordMessageCommandEnum.FEATURE)}`;
    }

    return {
      name: `Example`,
      value: `\`${userCommand} ${_.toString(randomFeature)}\``,
    };
  }
}
