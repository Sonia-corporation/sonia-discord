import { EmbedFieldData, MessageEmbedOptions } from "discord.js";
import _ from "lodash";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { DiscordMessageCommandEnum } from "../../../../enums/commands/discord-message-command.enum";
import { discordGetCommandAndFirstArgument } from "../../../../functions/commands/getters/discord-get-command-and-first-argument";
import { IDiscordMessageResponse } from "../../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../../config/discord-message-config.service";
import { DiscordMessageCommandCliErrorService } from "../../discord-message-command-cli-error.service";
import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";
import { getDiscordMessageCommandNoonAllFlags } from "../features/noon/functions/get-discord-message-command-noon-all-flags";
import { DiscordMessageCommandFeatureErrorCoreService } from "./discord-message-command-feature-error-core.service";

export class DiscordMessageCommandFeatureEmptyFlagsErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureEmptyFlagsErrorService;

  public static getInstance(): DiscordMessageCommandFeatureEmptyFlagsErrorService {
    if (_.isNil(DiscordMessageCommandFeatureEmptyFlagsErrorService._instance)) {
      DiscordMessageCommandFeatureEmptyFlagsErrorService._instance = new DiscordMessageCommandFeatureEmptyFlagsErrorService();
    }

    return DiscordMessageCommandFeatureEmptyFlagsErrorService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FLAGS_ERROR_SERVICE
    );
  }

  public getMessageResponse(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[],
    featureName: Readonly<DiscordMessageCommandFeatureNameEnum>
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
                embed: this._getEmptyContentErrorMessageEmbed(
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

  private _getEmptyContentErrorMessageEmbed(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[],
    featureName: Readonly<DiscordMessageCommandFeatureNameEnum>
  ): MessageEmbedOptions {
    return {
      fields: this._getEmptyFlagsErrorMessageEmbedFields(
        anyDiscordMessage,
        commands,
        featureName
      ),
      footer: this._getErrorMessageEmbedFooter(),
      title: this._getErrorMessageEmbedTitle(),
    };
  }

  private _getEmptyFlagsErrorMessageEmbedFields(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[],
    featureName: Readonly<DiscordMessageCommandFeatureNameEnum>
  ): EmbedFieldData[] {
    return [
      this._getEmptyFlagsErrorMessageEmbedFieldError(featureName),
      this._getEmptyFlagsErrorMessageEmbedFieldExample(
        anyDiscordMessage,
        commands
      ),
    ];
  }

  private _getEmptyFlagsErrorMessageEmbedFieldError(
    featureName: Readonly<DiscordMessageCommandFeatureNameEnum>
  ): EmbedFieldData {
    return {
      name: `No flags specified`,
      value: `You did not specify a flag to configure the \`${_.lowerCase(
        featureName
      )}\` feature.\nI will not guess what you wish to configure so please try again with a flag!\nAnd because I am kind and generous here is the list of all the flags you can configure for the \`${_.lowerCase(
        featureName
      )}\` feature with an example.`,
    };
  }

  private _getEmptyFlagsErrorMessageEmbedFieldExample(
    { content }: Readonly<IAnyDiscordMessage>,
    commands: Readonly<DiscordMessageCommandEnum>[]
  ): EmbedFieldData {
    const randomFlag: string = _.toLower(
      _.sample(getDiscordMessageCommandNoonAllFlags())
    );
    const userCommand: string | null = discordGetCommandAndFirstArgument({
      commands,
      message: _.isNil(content) ? `` : content,
      prefixes: DiscordMessageConfigService.getInstance().getMessageCommandPrefix(),
    });

    return {
      name: `Example`,
      value: `\`${userCommand} --${randomFlag}\``,
    };
  }
}
