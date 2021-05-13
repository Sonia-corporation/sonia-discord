import { DiscordSoniaConfigService } from './config/discord-sonia-config.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { ProfileConfigService } from '../../../profile/services/config/profile-config.service';
import { addDiscordDevPrefix } from '../../functions/dev-prefix/add-discord-dev-prefix';
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from '../../interfaces/discord-sonia-corporation-message-embed-author-config';
import { DiscordClientService } from '../../services/discord-client.service';
import { isDiscordClientUser } from '../functions/is-discord-client-user';
import { ISonia } from '../types/sonia';
import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';

export class DiscordSoniaService extends AbstractService {
  private static _instance: DiscordSoniaService;

  public static getInstance(): DiscordSoniaService {
    if (_.isNil(DiscordSoniaService._instance)) {
      DiscordSoniaService._instance = new DiscordSoniaService();
    }

    return DiscordSoniaService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_SONIA_SERVICE);
  }

  public isSonia(id: Readonly<string>): boolean {
    return _.isEqual(id, DiscordSoniaConfigService.getInstance().getId());
  }

  public getSonia(): ISonia | null {
    return DiscordClientService.getInstance().getClient().user;
  }

  public getFullName(): string | null {
    const sonia: ISonia | null = this.getSonia();

    if (!_.isNil(sonia)) {
      return `${sonia.username}#${sonia.discriminator}`;
    }

    return null;
  }

  public isValid(sonia: unknown): sonia is ISonia {
    return isDiscordClientUser(sonia);
  }

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    const discordSoniaCorporationMessageEmbedAuthorConfig: IDiscordSoniaCorporationMessageEmbedAuthorConfig =
      DiscordSoniaConfigService.getInstance().getCorporationMessageEmbedAuthor();

    return {
      iconURL: discordSoniaCorporationMessageEmbedAuthorConfig.iconURL,
      name: this.getCorporationMessageEmbedAuthorName(),
      url: discordSoniaCorporationMessageEmbedAuthorConfig.url,
    };
  }

  public getCorporationMessageEmbedAuthorName(): string {
    const discordSoniaCorporationMessageEmbedAuthorConfigName: string =
      DiscordSoniaConfigService.getInstance().getCorporationMessageEmbedAuthorName();

    if (!AppConfigService.getInstance().isProduction()) {
      return addDiscordDevPrefix({
        discordId: ProfileConfigService.getInstance().getDiscordId(),
        hasEmphasis: false,
        message: discordSoniaCorporationMessageEmbedAuthorConfigName,
        nickname: ProfileConfigService.getInstance().getNickname(),
      });
    }

    return discordSoniaCorporationMessageEmbedAuthorConfigName;
  }

  public getCorporationImageUrl(): string {
    return DiscordSoniaConfigService.getInstance().getCorporationImageUrl();
  }

  public getImageUrl(): string | null {
    const sonia: ISonia | null = this.getSonia();

    if (_.isNil(sonia)) {
      return null;
    }

    return sonia.displayAvatarURL();
  }
}
