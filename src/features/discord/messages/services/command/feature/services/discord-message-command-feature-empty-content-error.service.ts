import { DiscordMessageCommandFeatureErrorCoreService } from './discord-message-command-feature-error-core.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { GithubConfigService } from '../../../../../../github/services/config/github-config.service';
import { DiscordGuildConfigService } from '../../../../../guilds/services/config/discord-guild-config.service';
import { IDiscordMessageResponse } from '../../../../interfaces/discord-message-response';
import { DiscordMessageCommandCliErrorService } from '../../discord-message-command-cli-error.service';
import { APIEmbed, APIEmbedField } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureEmptyContentErrorService extends DiscordMessageCommandFeatureErrorCoreService {
  private static _instance: DiscordMessageCommandFeatureEmptyContentErrorService;

  public static getInstance(): DiscordMessageCommandFeatureEmptyContentErrorService {
    if (_.isNil(DiscordMessageCommandFeatureEmptyContentErrorService._instance)) {
      DiscordMessageCommandFeatureEmptyContentErrorService._instance =
        new DiscordMessageCommandFeatureEmptyContentErrorService();
    }

    return DiscordMessageCommandFeatureEmptyContentErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_CONTENT_ERROR_SERVICE);
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse> {
    return DiscordMessageCommandCliErrorService.getInstance()
      .getCliErrorMessageResponse()
      .then((cliErrorMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed()],
          },
        };

        return Promise.resolve(_.merge(cliErrorMessageResponse, message));
      });
  }

  private _getMessageEmbed(): APIEmbed {
    return {
      fields: this._getMessageEmbedFields(),
      footer: this._getMessageEmbedFooter(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedFields(): APIEmbedField[] {
    return [this._getMessageEmbedFieldError(), this._getMessageEmbedFieldErrorReport()];
  }

  private _getMessageEmbedFieldError(): APIEmbedField {
    return {
      inline: false,
      name: `Empty content`,
      value: `The content of the message is empty.\nI can not process the feature command however this error should never happen!\nDo not be so selfish and share this information with my creators!`,
    };
  }

  private _getMessageEmbedFieldErrorReport(): APIEmbedField {
    const githubBugReportUrl: string = GithubConfigService.getInstance().getBugReportUrl();
    const discordSoniaPermanentGuildInviteUrl: string =
      DiscordGuildConfigService.getInstance().getSoniaPermanentGuildInviteUrl();

    return {
      inline: false,
      name: `Help me to help you`,
      value: `You can create a [bug report](${githubBugReportUrl}) or reach my creators on [discord](${discordSoniaPermanentGuildInviteUrl}).`,
    };
  }
}
