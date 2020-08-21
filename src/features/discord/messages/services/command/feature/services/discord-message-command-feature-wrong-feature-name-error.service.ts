import {
  EmbedFieldData,
  MessageEmbedFooter,
  MessageEmbedOptions,
} from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordSoniaService } from "../../../../../users/services/discord-sonia.service";
import { DiscordMessageCommandEnum } from "../../../../enums/command/discord-message-command.enum";
import { discordGetCommandAndPrefix } from "../../../../functions/commands/discord-get-command-and-prefix";
import { IDiscordMessageResponse } from "../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../../config/discord-message-config.service";
import { DiscordMessageCommandCliErrorService } from "../../discord-message-command-cli-error.service";
import { getDiscordMessageCommandAllFeatureNames } from "../functions/get-discord-message-command-all-feature-names";

export class DiscordMessageCommandFeatureWrongFeatureNameErrorService extends AbstractService {
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

  private _getErrorMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Invalid feature command`,
    };
  }

  private _getErrorMessageEmbedTitle(): string {
    return `I can not handle your request`;
  }

  private _getMessageEmbedFieldErrorAllFeatures(): EmbedFieldData {
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

  private _getMessageEmbedFieldErrorExample(
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
      this._getMessageEmbedFieldErrorExample(anyDiscordMessage, commands),
    ];
  }

  private _getWrongFeatureNameErrorMessageEmbedFieldError(
    featureName: Readonly<string>
  ): EmbedFieldData {
    return {
      name: `Wrong feature name`,
      value: `\`${featureName}\` is not an existing feature...\nLet me show you the list of available features and maybe try again with a valid one this time, ok?`,
    };
  }
}
