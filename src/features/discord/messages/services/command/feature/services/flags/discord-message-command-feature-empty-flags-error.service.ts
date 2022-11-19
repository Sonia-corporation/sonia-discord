import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { DiscordMessageCommandEnum } from '../../../../../enums/commands/discord-message-command.enum';
import { discordGetCommandAndFirstArgument } from '../../../../../functions/commands/getters/discord-get-command-and-first-argument';
import { IDiscordMessageResponse } from '../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../../config/discord-message-config.service';
import { DiscordMessageCommandCliErrorService } from '../../../discord-message-command-cli-error.service';
import { DiscordMessageCommandFeatureNameEnum } from '../../enums/discord-message-command-feature-name.enum';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from '../../features/noon/constants/discord-message-command-feature-noon-flags';
import { DiscordMessageCommandFeatureErrorCoreService } from '../discord-message-command-feature-error-core.service';
import { EmbedFieldData, MessageEmbedOptions } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureEmptyFlagsErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureEmptyFlagsErrorService;

  public static getInstance(): DiscordMessageCommandFeatureEmptyFlagsErrorService {
    if (_.isNil(DiscordMessageCommandFeatureEmptyFlagsErrorService._instance)) {
      DiscordMessageCommandFeatureEmptyFlagsErrorService._instance =
        new DiscordMessageCommandFeatureEmptyFlagsErrorService();
    }

    return DiscordMessageCommandFeatureEmptyFlagsErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FLAGS_ERROR_SERVICE);
  }

  public getMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    commands: DiscordMessageCommandEnum[],
    featureName: DiscordMessageCommandFeatureNameEnum
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then((cliErrorMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(anyDiscordMessage, commands, featureName)],
          },
        };

        return Promise.resolve(_.merge(cliErrorMessageResponse, message));
      });
  }

  private _getMessageEmbed(
    anyDiscordMessage: IAnyDiscordMessage,
    commands: DiscordMessageCommandEnum[],
    featureName: DiscordMessageCommandFeatureNameEnum
  ): MessageEmbedOptions {
    return {
      fields: this._getMessageEmbedFields(anyDiscordMessage, commands, featureName),
      footer: this._getMessageEmbedFooter(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedFields(
    anyDiscordMessage: IAnyDiscordMessage,
    commands: DiscordMessageCommandEnum[],
    featureName: DiscordMessageCommandFeatureNameEnum
  ): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldError(featureName),
      this._getMessageEmbedFieldAllFlags(),
      this._getMessageEmbedFieldExample(anyDiscordMessage, commands),
    ];
  }

  private _getMessageEmbedFieldError(featureName: DiscordMessageCommandFeatureNameEnum): EmbedFieldData {
    return {
      name: `No flags specified`,
      value: `You did not specify a flag to configure the ${_.lowerCase(
        featureName
      )} feature.\nI will not guess what you wish to configure so please try again with a flag!\nAnd because I am kind and generous here is the list of all the flags available for the ${_.lowerCase(
        featureName
      )} feature with an example.`,
    };
  }

  private _getMessageEmbedFieldAllFlags(): EmbedFieldData {
    return {
      name: `All flags`,
      value: DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getAllFlagsNameWithShortcutsExample(),
    };
  }

  private _getMessageEmbedFieldExample(
    { content }: IAnyDiscordMessage,
    commands: DiscordMessageCommandEnum[]
  ): EmbedFieldData {
    const randomFlag: string | undefined = DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS.getRandomFlagUsageExample();
    let userCommand: string | null = discordGetCommandAndFirstArgument({
      commands,
      message: _.isNil(content) ? `` : content,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });

    if (_.isNil(userCommand)) {
      userCommand = `!${_.toLower(DiscordMessageCommandEnum.FEATURE)}`;
    }

    return {
      name: `Example`,
      value: `\`${userCommand} ${_.toString(randomFlag)}\``,
    };
  }
}
