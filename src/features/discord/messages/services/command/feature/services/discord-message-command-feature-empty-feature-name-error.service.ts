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

export class DiscordMessageCommandFeatureEmptyFeatureNameErrorService extends AbstractService {
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
