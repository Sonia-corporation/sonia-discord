import { EmbedFieldData, MessageEmbedOptions } from "discord.js";
import _ from "lodash";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordMessageCommandEnum } from "../../../../enums/command/discord-message-command.enum";
import { IDiscordMessageResponse } from "../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageCommandCliErrorService } from "../../discord-message-command-cli-error.service";
import { DiscordMessageCommandFeatureErrorCoreService } from "./discord-message-command-feature-error-core.service";

export class DiscordMessageCommandFeatureEmptyFeatureNameErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureEmptyFeatureNameErrorService;

  public static getInstance(): DiscordMessageCommandFeatureEmptyFeatureNameErrorService {
    if (
      _.isNil(
        DiscordMessageCommandFeatureEmptyFeatureNameErrorService._instance
      )
    ) {
      DiscordMessageCommandFeatureEmptyFeatureNameErrorService._instance = new DiscordMessageCommandFeatureEmptyFeatureNameErrorService();
    }

    return DiscordMessageCommandFeatureEmptyFeatureNameErrorService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FEATURE_NAME_ERROR_SERVICE
    );
  }

  public getMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[]
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
                embed: this._getEmptyFeatureNameErrorMessageEmbed(
                  anyDiscordMessage,
                  commands
                ),
                split: true,
              },
              response: ``,
            } as IDiscordMessageResponse)
          )
      );
  }

  private _getEmptyFeatureNameErrorMessageEmbed(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[]
  ): MessageEmbedOptions {
    return {
      fields: this._getEmptyFeatureNameErrorMessageEmbedFields(
        anyDiscordMessage,
        commands
      ),
      footer: this._getErrorMessageEmbedFooter(),
      title: this._getErrorMessageEmbedTitle(),
    };
  }

  private _getEmptyFeatureNameErrorMessageEmbedFields(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[]
  ): EmbedFieldData[] {
    return [
      this._getEmptyFeatureNameErrorMessageEmbedFieldError(),
      this._getMessageEmbedFieldErrorAllFeatures(),
      this._getMessageEmbedFieldErrorExample(anyDiscordMessage, commands),
    ];
  }

  private _getEmptyFeatureNameErrorMessageEmbedFieldError(): EmbedFieldData {
    return {
      name: `Empty feature name`,
      value: `You did not specify the name of the feature you wish to configure.\nI will not guess it for you so please try again with a feature name!\nAnd because I am kind and generous here is the list of all the features you can configure.`,
    };
  }
}
