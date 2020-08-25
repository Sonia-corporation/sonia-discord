import { EmbedFieldData, MessageEmbedFooter } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordSoniaService } from "../../../../../users/services/discord-sonia.service";
import { DiscordMessageCommandEnum } from "../../../../enums/command/discord-message-command.enum";
import { discordGetCommandAndPrefix } from "../../../../functions/commands/getters/discord-get-command-and-prefix";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../../config/discord-message-config.service";
import { getDiscordMessageCommandAllFeatureNames } from "../functions/get-discord-message-command-all-feature-names";

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
    const allFeatureNames: string = _.trimEnd(
      _.reduce(
        getDiscordMessageCommandAllFeatureNames(),
        (value: Readonly<string>, featureName: Readonly<string>): string =>
          `${value}\`${_.toLower(featureName)}\`, `,
        ``
      ),
      `, `
    );

    return {
      name: `All features`,
      value: allFeatureNames,
    };
  }

  protected _getMessageEmbedFieldErrorFeatureExample(
    { content }: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[]
  ): EmbedFieldData {
    const randomFeatureName: string = _.toLower(
      _.sample(getDiscordMessageCommandAllFeatureNames())
    );
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
      value: `\`${userCommand} ${randomFeatureName}\``,
    };
  }
}
