import _ from 'lodash';
import { PartialNested } from '../../../types/partial-nested';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { IDiscordConfig } from '../interfaces/discord-config';
import { IDiscordGuildConfig } from '../interfaces/discord-guild-config';
import { DISCORD_GUILD_CONFIG } from './discord-guild-config';

export class DiscordGuildConfigService {
  private static _instance: DiscordGuildConfigService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordGuildConfigService {
    if (_.isNil(DiscordGuildConfigService._instance)) {
      DiscordGuildConfigService._instance = new DiscordGuildConfigService(config);
    }

    return DiscordGuildConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordGuildConfigService`;

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    this.updateConfig(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateGuild(config.guild);

      this._loggerService.debug(this._className, this._chalkService.text(`configuration updated`));
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

      this._loggerService.log(this._className, this._chalkService.text(`welcome new members state updated to: ${this._chalkService.value(DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers)}`));
    }
  }
}
