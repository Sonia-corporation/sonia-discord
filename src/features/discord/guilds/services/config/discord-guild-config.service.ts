import { DiscordGuildConfigCoreService } from './discord-guild-config-core.service';
import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { IDiscordGuildConfig } from '../../../interfaces/discord-guild-config';
import _ from 'lodash';

export class DiscordGuildConfigService extends AbstractService {
  private static _instance: DiscordGuildConfigService;

  public static getInstance(): DiscordGuildConfigService {
    if (_.isNil(DiscordGuildConfigService._instance)) {
      DiscordGuildConfigService._instance = new DiscordGuildConfigService();
    }

    return DiscordGuildConfigService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_CONFIG_SERVICE);
  }

  public getConfig(): IDiscordGuildConfig {
    return {
      shouldSendCookiesOnCreate: this.shouldSendCookiesOnCreate(),
      shouldSendNoonMessage: this.shouldSendNoonMessage(),
      shouldWelcomeNewMembers: this.shouldWelcomeNewMembers(),
      soniaGuildId: this.getSoniaGuildId(),
      soniaPermanentGuildInviteUrl: this.getSoniaPermanentGuildInviteUrl(),
    };
  }

  public shouldSendCookiesOnCreate(): boolean {
    return DiscordGuildConfigCoreService.getInstance().shouldSendCookiesOnCreate;
  }

  public shouldSendNoonMessage(): boolean {
    return DiscordGuildConfigCoreService.getInstance().shouldSendNoonMessage;
  }

  public shouldWelcomeNewMembers(): boolean {
    return DiscordGuildConfigCoreService.getInstance().shouldWelcomeNewMembers;
  }

  public getSoniaGuildId(): string {
    return DiscordGuildConfigCoreService.getInstance().soniaGuildId;
  }

  public getSoniaPermanentGuildInviteUrl(): string {
    return DiscordGuildConfigCoreService.getInstance().soniaPermanentGuildInviteUrl;
  }
}
