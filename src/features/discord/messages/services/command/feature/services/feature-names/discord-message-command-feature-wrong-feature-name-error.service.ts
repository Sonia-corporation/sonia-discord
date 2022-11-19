import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { DiscordMessageCommandEnum } from '../../../../../enums/commands/discord-message-command.enum';
import { IDiscordMessageResponse } from '../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../types/any-discord-message';
import { DiscordMessageCommandCliErrorService } from '../../../discord-message-command-cli-error.service';
import { DiscordMessageCommandFeatureErrorCoreService } from '../discord-message-command-feature-error-core.service';
import { EmbedFieldData, MessageEmbedOptions } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureWrongFeatureNameErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureWrongFeatureNameErrorService;

  public static getInstance(): DiscordMessageCommandFeatureWrongFeatureNameErrorService {
    if (_.isNil(DiscordMessageCommandFeatureWrongFeatureNameErrorService._instance)) {
      DiscordMessageCommandFeatureWrongFeatureNameErrorService._instance =
        new DiscordMessageCommandFeatureWrongFeatureNameErrorService();
    }

    return DiscordMessageCommandFeatureWrongFeatureNameErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FEATURE_NAME_ERROR_SERVICE);
  }

  public getMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    commands: DiscordMessageCommandEnum[],
    featureName: string
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
    featureName: string
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
    featureName: string
  ): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldError(featureName),
      this._getMessageEmbedFieldAllFeatures(),
      this._getMessageEmbedFieldFeatureExample(anyDiscordMessage, commands),
    ];
  }

  private _getMessageEmbedFieldError(featureName: string): EmbedFieldData {
    return {
      name: `Wrong feature name`,
      value: `\`${featureName}\` is not an existing feature...\nLet me show you the list of available features with an example and maybe try again with a valid one this time, ok?`,
    };
  }
}
