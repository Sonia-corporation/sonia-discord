import _ from "lodash";
import { AbstractConfigService } from "../../../../../classes/abstract-config.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { PartialNested } from "../../../../../types/partial-nested";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordGuildConfig } from "../../../interfaces/discord-guild-config";
import { DiscordGuildConfigValueNameEnum } from "../../enums/discord-guild-config-value-name.enum";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core.service";
import { DiscordGuildConfigService } from "./discord-guild-config.service";

export class DiscordGuildConfigMutatorService extends AbstractConfigService<
  IDiscordConfig
> {
  private static _instance: DiscordGuildConfigMutatorService;

  public static getInstance(
    config?: Readonly<PartialNested<IDiscordConfig>>
  ): DiscordGuildConfigMutatorService {
    if (_.isNil(DiscordGuildConfigMutatorService._instance)) {
      DiscordGuildConfigMutatorService._instance = new DiscordGuildConfigMutatorService(
        config
      );
    }

    return DiscordGuildConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _discordGuildConfigCoreService: DiscordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
  private _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(ServiceNameEnum.DISCORD_GUILD_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
    this._discordGuildConfigService = DiscordGuildConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateGuild(config.guild);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateGuild(
    guild?: Readonly<PartialNested<IDiscordGuildConfig>>
  ): void {
    if (!_.isNil(guild)) {
      this.updateSendCookiesOnCreateState(guild.shouldSendCookiesOnCreate);
      this.updateSendIlEstMidiMessageState(guild.shouldSendIlEstMidiMessage);
      this.updateWelcomeNewMembersState(guild.shouldWelcomeNewMembers);
      this.updateSoniaGuildId(guild.soniaGuildId);
      this.updateSoniaPermanentGuildInviteUrl(
        guild.soniaPermanentGuildInviteUrl
      );
    }
  }

  public updateSendCookiesOnCreateState(
    shouldSendCookiesOnCreate?: Readonly<boolean>
  ): void {
    this._discordGuildConfigCoreService.shouldSendCookiesOnCreate = this._configService.getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: shouldSendCookiesOnCreate,
        oldValue: this._discordGuildConfigService.shouldSendCookiesOnCreate(),
        valueName:
          DiscordGuildConfigValueNameEnum.SHOULD_SEND_COOKIES_ON_CREATE,
      }
    );
  }

  public updateSendIlEstMidiMessageState(
    shouldSendIlEstMidiMessage?: Readonly<boolean>
  ): void {
    this._discordGuildConfigCoreService.shouldSendIlEstMidiMessage = this._configService.getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: shouldSendIlEstMidiMessage,
        oldValue: this._discordGuildConfigService.shouldSendIlEstMidiMessage(),
        valueName:
          DiscordGuildConfigValueNameEnum.SHOULD_SEND_IL_EST_MIDI_MESSAGE,
      }
    );
  }

  public updateWelcomeNewMembersState(
    shouldWelcomeNewMembers?: Readonly<boolean>
  ): void {
    this._discordGuildConfigCoreService.shouldWelcomeNewMembers = this._configService.getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: shouldWelcomeNewMembers,
        oldValue: this._discordGuildConfigService.shouldWelcomeNewMembers(),
        valueName: DiscordGuildConfigValueNameEnum.SHOULD_WELCOME_NEW_MEMBERS,
      }
    );
  }

  public updateSoniaGuildId(soniaGuildId?: Readonly<string>): void {
    this._discordGuildConfigCoreService.soniaGuildId = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: soniaGuildId,
        oldValue: this._discordGuildConfigService.getSoniaGuildId(),
        valueName: DiscordGuildConfigValueNameEnum.SONIA_GUILD_ID,
      }
    );
  }

  public updateSoniaPermanentGuildInviteUrl(
    soniaPermanentGuildInviteUrl?: Readonly<string>
  ): void {
    this._discordGuildConfigCoreService.soniaPermanentGuildInviteUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: soniaPermanentGuildInviteUrl,
        oldValue: this._discordGuildConfigService.getSoniaPermanentGuildInviteUrl(),
        valueName:
          DiscordGuildConfigValueNameEnum.SONIA_PERMANENT_GUILD_INVITE_URL,
      }
    );
  }
}
