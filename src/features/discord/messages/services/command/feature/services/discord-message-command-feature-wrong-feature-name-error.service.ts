import { EmbedFieldData, MessageEmbedOptions } from "discord.js";
import _ from "lodash";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordMessageCommandEnum } from "../../../../enums/commands/discord-message-command.enum";
import { IDiscordMessageResponse } from "../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageCommandCliErrorService } from "../../discord-message-command-cli-error.service";
import { DiscordMessageCommandFeatureErrorCoreService } from "./discord-message-command-feature-error-core.service";

export class DiscordMessageCommandFeatureWrongFeatureNameErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureWrongFeatureNameErrorService;

  public static getInstance(): DiscordMessageCommandFeatureWrongFeatureNameErrorService {
    if (
      _.isNil(
        DiscordMessageCommandFeatureWrongFeatureNameErrorService._instance
      )
    ) {
      DiscordMessageCommandFeatureWrongFeatureNameErrorService._instance = new DiscordMessageCommandFeatureWrongFeatureNameErrorService();
    }

    return DiscordMessageCommandFeatureWrongFeatureNameErrorService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FEATURE_NAME_ERROR_SERVICE
    );
  }

  public getMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[],
    featureName: Readonly<string>
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
                embed: this._getWrongFeatureNameErrorMessageEmbed(
                  anyDiscordMessage,
                  commands,
                  featureName
                ),
                split: true,
              },
              response: ``,
            } as IDiscordMessageResponse)
          )
      );
  }

  private _getWrongFeatureNameErrorMessageEmbed(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[],
    featureName: Readonly<string>
  ): MessageEmbedOptions {
    return {
      fields: this._getWrongFeatureNameErrorMessageEmbedFields(
        anyDiscordMessage,
        commands,
        featureName
      ),
      footer: this._getErrorMessageEmbedFooter(),
      title: this._getErrorMessageEmbedTitle(),
    };
  }

  private _getWrongFeatureNameErrorMessageEmbedFields(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[],
    featureName: Readonly<string>
  ): EmbedFieldData[] {
    return [
      this._getWrongFeatureNameErrorMessageEmbedFieldError(featureName),
      this._getMessageEmbedFieldErrorAllFeatures(),
      this._getMessageEmbedFieldErrorFeatureExample(
        anyDiscordMessage,
        commands
      ),
    ];
  }

  private _getWrongFeatureNameErrorMessageEmbedFieldError(
    featureName: Readonly<string>
  ): EmbedFieldData {
    return {
      name: `Wrong feature name`,
      value: `\`${featureName}\` is not an existing feature...\nLet me show you the list of available features with an example and maybe try again with a valid one this time, ok?`,
    };
  }
}
