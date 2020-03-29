import _ from 'lodash';
import { AbstractConfigService } from '../../../../classes/abstract-config-service';
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

  // @todo add coverage
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

  // @todo add coverage
  public updateGuild(guild?: Readonly<PartialNested<IDiscordGuildConfig>>): void {
    if (!_.isNil(guild)) {
      this.updateWelcomeNewMembersState(guild.shouldWelcomeNewMembers);
    }
  }

  public shouldWelcomeNewMembers(): boolean {
    return DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers;
  }

  public updateWelcomeNewMembersState(shouldWelcomeNewMembers?: Readonly<boolean>): void {
    DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers = this._configService.getUpdatedBoolean({
      context: this._className,
      newValue: shouldWelcomeNewMembers,
      oldValue: DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers,
      valueName: `welcome new members state`
    });
  }

  public getSoniaPermanentGuildInviteUrl(): string {
    return DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl;
  }

  public updateSoniaPermanentGuildInviteUrl(soniaPermanentGuildInviteUrl?: Readonly<string>): void {
    DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl = this._configService.getUpdatedString({
      context: this._className,
      newValue: soniaPermanentGuildInviteUrl,
      oldValue: DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl,
      valueName: `Sonia permanent guild invite url`
    });
  }
}
