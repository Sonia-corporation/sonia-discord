import _ from 'lodash';
import { AbstractConfigService } from '../../../../classes/abstract-config-service';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { PartialNested } from '../../../../types/partial-nested';
import { IDiscordConfig } from '../../interfaces/discord-config';
import { IDiscordGuildConfig } from '../../interfaces/discord-guild-config';
import { DISCORD_GUILD_CONFIG } from '../constants/discord-guild-config';

export class DiscordGuildConfigService extends AbstractConfigService<IDiscordConfig> {
  private static _instance: DiscordGuildConfigService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordGuildConfigService {
    if (_.isNil(DiscordGuildConfigService._instance)) {
      DiscordGuildConfigService._instance = new DiscordGuildConfigService(config);
    }

    return DiscordGuildConfigService._instance;
  }

  protected readonly _className = `DiscordGuildConfigService`;

  protected constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateGuild(config.guild);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }

  public getGuild(): IDiscordGuildConfig {
    return DISCORD_GUILD_CONFIG;
  }

  public updateGuild(guild?: Readonly<PartialNested<IDiscordGuildConfig>>): void {
    if (!_.isNil(guild)) {
      this.updateWelcomeNewMembersState(guild.shouldWelcomeNewMembers);
    }
  }

  public shouldWelcomeNewMembers(): boolean {
    return DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers;
  }

  public updateWelcomeNewMembersState(welcomeNewMembers?: Readonly<boolean>): void {
    if (_.isBoolean(welcomeNewMembers)) {
      DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers = welcomeNewMembers;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`welcome new members state updated to: ${this._chalkService.value(DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers)}`)
      });
    }
  }

  public getSoniaPermanentGuildInviteUrl(): string {
    return DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl;
  }

  public updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl?: Readonly<string>): void {
    if (_.isString(soniaPermanentGuildInviteUrl)) {
      DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl = soniaPermanentGuildInviteUrl;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`Sonia permanent guild invite url updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl))}`)
      });
    }
  }
}
