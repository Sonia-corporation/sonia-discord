import _ from "lodash";
import { AbstractConfigService } from "../../../../../classes/services/abstract-config.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { IPartialNested } from "../../../../../types/partial-nested";
import { ConfigService } from "../../../../config/services/config.service";
import { ChalkService } from "../../../../logger/services/chalk/chalk.service";
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
    config?: Readonly<IPartialNested<IDiscordConfig>>
  ): DiscordGuildConfigMutatorService {
    if (_.isNil(DiscordGuildConfigMutatorService._instance)) {
      DiscordGuildConfigMutatorService._instance = new DiscordGuildConfigMutatorService(
        config
      );
    }

    return DiscordGuildConfigMutatorService._instance;
  }

  public constructor(config?: Readonly<IPartialNested<IDiscordConfig>>) {
    super(ServiceNameEnum.DISCORD_GUILD_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    LoggerService.getInstance();
    DiscordGuildConfigCoreService.getInstance();
    DiscordGuildConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<IPartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateGuild(config.guild);

      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`configuration updated`),
      });
    }
  }

  public updateGuild(
    guild?: Readonly<IPartialNested<IDiscordGuildConfig>>
  ): void {
    if (!_.isNil(guild)) {
      this.updateSendCookiesOnCreateState(guild.shouldSendCookiesOnCreate);
      this.updateSendNoonMessageState(guild.shouldSendNoonMessage);
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
    DiscordGuildConfigCoreService.getInstance().shouldSendCookiesOnCreate = ConfigService.getInstance().getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: shouldSendCookiesOnCreate,
        oldValue: DiscordGuildConfigService.getInstance().shouldSendCookiesOnCreate(),
        valueName:
          DiscordGuildConfigValueNameEnum.SHOULD_SEND_COOKIES_ON_CREATE,
      }
    );
  }

  public updateSendNoonMessageState(
    shouldSendNoonMessage?: Readonly<boolean>
  ): void {
    DiscordGuildConfigCoreService.getInstance().shouldSendNoonMessage = ConfigService.getInstance().getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: shouldSendNoonMessage,
        oldValue: DiscordGuildConfigService.getInstance().shouldSendNoonMessage(),
        valueName: DiscordGuildConfigValueNameEnum.SHOULD_SEND_NOON_MESSAGE,
      }
    );
  }

  public updateWelcomeNewMembersState(
    shouldWelcomeNewMembers?: Readonly<boolean>
  ): void {
    DiscordGuildConfigCoreService.getInstance().shouldWelcomeNewMembers = ConfigService.getInstance().getUpdatedBoolean(
      {
        context: this._serviceName,
        newValue: shouldWelcomeNewMembers,
        oldValue: DiscordGuildConfigService.getInstance().shouldWelcomeNewMembers(),
        valueName: DiscordGuildConfigValueNameEnum.SHOULD_WELCOME_NEW_MEMBERS,
      }
    );
  }

  public updateSoniaGuildId(soniaGuildId?: Readonly<string>): void {
    DiscordGuildConfigCoreService.getInstance().soniaGuildId = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: soniaGuildId,
        oldValue: DiscordGuildConfigService.getInstance().getSoniaGuildId(),
        valueName: DiscordGuildConfigValueNameEnum.SONIA_GUILD_ID,
      }
    );
  }

  public updateSoniaPermanentGuildInviteUrl(
    soniaPermanentGuildInviteUrl?: Readonly<string>
  ): void {
    DiscordGuildConfigCoreService.getInstance().soniaPermanentGuildInviteUrl = ConfigService.getInstance().getUpdatedString(
      {
        context: this._serviceName,
        newValue: soniaPermanentGuildInviteUrl,
        oldValue: DiscordGuildConfigService.getInstance().getSoniaPermanentGuildInviteUrl(),
        valueName:
          DiscordGuildConfigValueNameEnum.SONIA_PERMANENT_GUILD_INVITE_URL,
      }
    );
  }
}
