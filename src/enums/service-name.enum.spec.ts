import { ServiceNameEnum } from './service-name.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`ServiceNameEnum`, (): void => {
  it(`should have 122 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ServiceNameEnum)).toBe(122);
  });

  it(`should have a member "APP_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.APP_CONFIG_CORE_SERVICE).toBe(`AppConfigCoreService`);
  });

  it(`should have a member "APP_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.APP_CONFIG_MUTATOR_SERVICE).toBe(`AppConfigMutatorService`);
  });

  it(`should have a member "APP_CONFIG_QUERY_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.APP_CONFIG_QUERY_SERVICE).toBe(`AppConfigQueryService`);
  });

  it(`should have a member "APP_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.APP_CONFIG_SERVICE).toBe(`AppConfigService`);
  });

  it(`should have a member "CHALK_COLOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.CHALK_COLOR_SERVICE).toBe(`ChalkColorService`);
  });

  it(`should have a member "CHALK_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.CHALK_SERVICE).toBe(`ChalkService`);
  });

  it(`should have a member "CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.CONFIG_SERVICE).toBe(`ConfigService`);
  });

  it(`should have a member "CORE_EVENT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.CORE_EVENT_SERVICE).toBe(`CoreEventService`);
  });

  it(`should have a member "CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.CORE_SERVICE).toBe(`CoreService`);
  });

  it(`should have a member "DISCORD_ACTIVITY_SONIA_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE).toBe(`DiscordActivitySoniaService`);
  });

  it(`should have a member "DISCORD_AUTHENTICATION_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_AUTHENTICATION_SERVICE).toBe(`DiscordAuthenticationService`);
  });

  it(`should have a member "DISCORD_AUTHOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_AUTHOR_SERVICE).toBe(`DiscordAuthorService`);
  });

  it(`should have a member "DISCORD_CHANNEL_GUILD_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_CHANNEL_GUILD_SERVICE).toBe(`DiscordChannelGuildService`);
  });

  it(`should have a member "DISCORD_CHANNEL_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_CHANNEL_SERVICE).toBe(`DiscordChannelService`);
  });

  it(`should have a member "DISCORD_CHANNEL_TYPING_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_CHANNEL_TYPING_SERVICE).toBe(`DiscordChannelTypingService`);
  });

  it(`should have a member "DISCORD_CLIENT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_CLIENT_SERVICE).toBe(`DiscordClientService`);
  });

  it(`should have a member "DISCORD_GUILD_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_CONFIG_CORE_SERVICE).toBe(`DiscordGuildConfigCoreService`);
  });

  it(`should have a member "DISCORD_GUILD_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_CONFIG_MUTATOR_SERVICE).toBe(`DiscordGuildConfigMutatorService`);
  });

  it(`should have a member "DISCORD_GUILD_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_CONFIG_SERVICE).toBe(`DiscordGuildConfigService`);
  });

  it(`should have a member "DISCORD_GUILD_CREATE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE).toBe(`DiscordGuildCreateService`);
  });

  it(`should have a member "DISCORD_GUILD_MEMBER_ADD_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_MEMBER_ADD_SERVICE).toBe(`DiscordGuildMemberAddService`);
  });

  it(`should have a member "DISCORD_GUILD_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_SERVICE).toBe(`DiscordGuildService`);
  });

  it(`should have a member "DISCORD_GUILD_SONIA_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_GUILD_SONIA_SERVICE).toBe(`DiscordGuildSoniaService`);
  });

  it(`should have a member "DISCORD_LOGGER_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE).toBe(`DiscordLoggerErrorService`);
  });

  it(`should have a member "DISCORD_LOGGER_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_LOGGER_SERVICE).toBe(`DiscordLoggerService`);
  });

  it(`should have a member "DISCORD_LOGGER_WARNING_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_LOGGER_WARNING_SERVICE).toBe(`DiscordLoggerWarningService`);
  });

  it(`should have a member "DISCORD_MENTION_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MENTION_SERVICE).toBe(`DiscordMentionService`);
  });

  it(`should have a member "DISCORD_MESSAGE_ANY_QUESTION_PINEAPPLE_PIZZA_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_ANY_QUESTION_PINEAPPLE_PIZZA_SERVICE).toBe(
      `DiscordMessageAnyQuestionPineapplePizzaService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_AUTHOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_AUTHOR_SERVICE).toBe(`DiscordMessageAuthorService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_CLI_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_CLI_ERROR_SERVICE).toBe(`DiscordMessageCommandCliErrorService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_COOKIE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_COOKIE_SERVICE).toBe(`DiscordMessageCommandCookieService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_ERROR_SERVICE).toBe(`DiscordMessageCommandErrorService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_DUPLICATED_FLAGS_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_DUPLICATED_FLAGS_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureDuplicatedFlagsErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_CONTENT_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_CONTENT_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureEmptyContentErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FEATURE_NAME_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FEATURE_NAME_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureEmptyFeatureNameErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FLAGS_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_EMPTY_FLAGS_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureEmptyFlagsErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_CORE_SERVICE).toBe(
      `DiscordMessageCommandFeatureNoonConfigCoreService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_MUTATOR_SERVICE).toBe(
      `DiscordMessageCommandFeatureNoonConfigMutatorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_SERVICE).toBe(
      `DiscordMessageCommandFeatureNoonConfigService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SUCCESS_FLAG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SUCCESS_FLAG_SERVICE).toBe(
      `DiscordMessageCommandFeatureNoonEnabledSuccessFlagService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE).toBe(
      `DiscordMessageCommandFeatureNoonService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_OPPOSITE_FLAGS_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_OPPOSITE_FLAGS_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureOppositeFlagsErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_CORE_SERVICE).toBe(
      `DiscordMessageCommandFeatureReleaseNotesConfigCoreService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_MUTATOR_SERVICE).toBe(
      `DiscordMessageCommandFeatureReleaseNotesConfigMutatorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_SERVICE).toBe(
      `DiscordMessageCommandFeatureReleaseNotesConfigService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED_SUCCESS_FLAG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED_SUCCESS_FLAG_SERVICE).toBe(
      `DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_SERVICE).toBe(
      `DiscordMessageCommandFeatureReleaseNotesService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE).toBe(`DiscordMessageCommandFeatureService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FEATURE_NAME_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FEATURE_NAME_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureWrongFeatureNameErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FLAGS_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FLAGS_ERROR_SERVICE).toBe(
      `DiscordMessageCommandFeatureWrongFlagsErrorService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_HELP_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HELP_SERVICE).toBe(`DiscordMessageCommandHelpService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_LUNCH_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_LUNCH_SERVICE).toBe(`DiscordMessageCommandLunchService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_QUOTE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_QUOTE_SERVICE).toBe(`DiscordMessageCommandQuoteService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_RELEASE_NOTES_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_RELEASE_NOTES_SERVICE).toBe(
      `DiscordMessageCommandReleaseNotesService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_SERVICE).toBe(`DiscordMessageCommandService`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_VERSION_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE).toBe(`DiscordMessageCommandVersionService`);
  });

  it(`should have a member "DISCORD_MESSAGE_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_CORE_SERVICE).toBe(`DiscordMessageConfigCoreService`);
  });

  it(`should have a member "DISCORD_MESSAGE_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_MUTATOR_SERVICE).toBe(`DiscordMessageConfigMutatorService`);
  });

  it(`should have a member "DISCORD_MESSAGE_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_SERVICE).toBe(`DiscordMessageConfigService`);
  });

  it(`should have a member "DISCORD_MESSAGE_CONTENT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_CONTENT_SERVICE).toBe(`DiscordMessageContentService`);
  });

  it(`should have a member "DISCORD_MESSAGE_DM_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_DM_SERVICE).toBe(`DiscordMessageDmService`);
  });

  it(`should have a member "DISCORD_MESSAGE_ERROR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_ERROR_SERVICE).toBe(`DiscordMessageErrorService`);
  });

  it(`should have a member "DISCORD_MESSAGE_HELP_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_HELP_SERVICE).toBe(`DiscordMessageHelpService`);
  });

  it(`should have a member "DISCORD_MESSAGE_HOTEL_TRIVAGO_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_HOTEL_TRIVAGO_SERVICE).toBe(`DiscordMessageHotelTrivagoService`);
  });

  it(`should have a member "DISCORD_MESSAGE_PING_PONG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_PING_PONG_SERVICE).toBe(`DiscordMessagePingPongService`);
  });

  it(`should have a member "DISCORD_MESSAGE_RIGHTS_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_RIGHTS_SERVICE).toBe(`DiscordMessageRightsService`);
  });

  it(`should have a member "DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_HUMANIZED_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_HUMANIZED_SERVICE).toBe(
      `DiscordMessageScheduleNoonCountHumanizedService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_MESSAGE_RESPONSE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_MESSAGE_RESPONSE_SERVICE).toBe(
      `DiscordMessageScheduleNoonCountMessageResponseService`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_SERVICE).toBe(`DiscordMessageScheduleNoonCountService`);
  });

  it(`should have a member "DISCORD_MESSAGE_SCHEDULE_NOON_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_SERVICE).toBe(`DiscordMessageScheduleNoonService`);
  });

  it(`should have a member "DISCORD_MESSAGE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_SERVICE).toBe(`DiscordMessageService`);
  });

  it(`should have a member "DISCORD_MESSAGE_SIMPLE_BASIC_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_SIMPLE_BASIC_SERVICE).toBe(`DiscordMessageSimpleBasicService`);
  });

  it(`should have a member "DISCORD_MESSAGE_TEXT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_MESSAGE_TEXT_SERVICE).toBe(`DiscordMessageTextService`);
  });

  it(`should have a member "DISCORD_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_SERVICE).toBe(`DiscordService`);
  });

  it(`should have a member "DISCORD_SONIA_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_SONIA_CONFIG_CORE_SERVICE).toBe(`DiscordSoniaConfigCoreService`);
  });

  it(`should have a member "DISCORD_SONIA_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_SONIA_CONFIG_MUTATOR_SERVICE).toBe(`DiscordSoniaConfigMutatorService`);
  });

  it(`should have a member "DISCORD_SONIA_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_SONIA_CONFIG_SERVICE).toBe(`DiscordSoniaConfigService`);
  });

  it(`should have a member "DISCORD_SONIA_EMOTIONAL_STATE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_SONIA_EMOTIONAL_STATE_SERVICE).toBe(`DiscordSoniaEmotionalStateService`);
  });

  it(`should have a member "DISCORD_SONIA_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.DISCORD_SONIA_SERVICE).toBe(`DiscordSoniaService`);
  });

  it(`should have a member "ENVIRONMENT_VALIDITY_CHECK_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.ENVIRONMENT_VALIDITY_CHECK_SERVICE).toBe(`EnvironmentValidityCheckService`);
  });

  it(`should have a member "FIREBASE_APP_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_APP_SERVICE).toBe(`FirebaseAppService`);
  });

  it(`should have a member "FIREBASE_GUILDS_BREAKING_CHANGES_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_BREAKING_CHANGE_SERVICE).toBe(`FirebaseGuildsBreakingChangeService`);
  });

  it(`should have a member "FIREBASE_GUILDS_COMMANDS_FEATURE_NOON_ENABLED_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_SERVICE).toBe(
      `FirebaseGuildsChannelsFeaturesNoonEnabledService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_STATE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_STATE_SERVICE).toBe(
      `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_SERVICE).toBe(
      `FirebaseGuildsChannelsFeaturesNoonService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_COMMANDS_FEATURE_RELEASE_NOTES_ENABLED_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_ENABLED_SERVICE).toBe(
      `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_ENABLED_STATE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_ENABLED_STATE_SERVICE).toBe(
      `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_SERVICE).toBe(
      `FirebaseGuildsChannelsFeaturesReleaseNotesService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_CHANNELS_FEATURES_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_SERVICE).toBe(`FirebaseGuildsChannelsFeaturesService`);
  });

  it(`should have a member "FIREBASE_GUILDS_CHANNELS_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_SERVICE).toBe(`FirebaseGuildsChannelsService`);
  });

  it(`should have a member "FIREBASE_GUILDS_NEW_VERSION_COUNT_HUMANIZED_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_HUMANIZED_SERVICE).toBe(
      `FirebaseGuildsNewVersionCountHumanizedService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_NEW_VERSION_COUNT_MESSAGE_RESPONSE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_MESSAGE_RESPONSE_SERVICE).toBe(
      `FirebaseGuildsNewVersionCountMessageResponseService`
    );
  });

  it(`should have a member "FIREBASE_GUILDS_NEW_VERSION_COUNT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_SERVICE).toBe(`FirebaseGuildsNewVersionCountService`);
  });

  it(`should have a member "FIREBASE_GUILDS_NEW_VERSION_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_SERVICE).toBe(`FirebaseGuildsNewVersionService`);
  });

  it(`should have a member "FIREBASE_GUILDS_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_SERVICE).toBe(`FirebaseGuildsService`);
  });

  it(`should have a member "FIREBASE_GUILDS_STORE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_STORE).toBe(`FirebaseGuildsStore`);
  });

  it(`should have a member "FIREBASE_GUILDS_STORE_QUERY"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_STORE_QUERY).toBe(`FirebaseGuildsStoreQuery`);
  });

  it(`should have a member "FIREBASE_GUILDS_STORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_GUILDS_STORE_SERVICE).toBe(`FirebaseGuildsStoreService`);
  });

  it(`should have a member "FIREBASE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.FIREBASE_SERVICE).toBe(`FirebaseService`);
  });

  it(`should have a member "GITHUB_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.GITHUB_CONFIG_CORE_SERVICE).toBe(`GithubConfigCoreService`);
  });

  it(`should have a member "GITHUB_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.GITHUB_CONFIG_MUTATOR_SERVICE).toBe(`GithubConfigMutatorService`);
  });

  it(`should have a member "GITHUB_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.GITHUB_CONFIG_SERVICE).toBe(`GithubConfigService`);
  });

  it(`should have a member "INIT_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.INIT_SERVICE).toBe(`InitService`);
  });

  it(`should have a member "LOGGER_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.LOGGER_CONFIG_CORE_SERVICE).toBe(`LoggerConfigCoreService`);
  });

  it(`should have a member "LOGGER_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.LOGGER_CONFIG_MUTATOR_SERVICE).toBe(`LoggerConfigMutatorService`);
  });

  it(`should have a member "LOGGER_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.LOGGER_CONFIG_SERVICE).toBe(`LoggerConfigService`);
  });

  it(`should have a member "LOGGER_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.LOGGER_SERVICE).toBe(`LoggerService`);
  });

  it(`should have a member "PROFILE_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.PROFILE_CONFIG_CORE_SERVICE).toBe(`ProfileConfigCoreService`);
  });

  it(`should have a member "PROFILE_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.PROFILE_CONFIG_MUTATOR_SERVICE).toBe(`ProfileConfigMutatorService`);
  });

  it(`should have a member "PROFILE_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.PROFILE_CONFIG_SERVICE).toBe(`ProfileConfigService`);
  });

  it(`should have a member "QUOTE_API_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.QUOTE_API_SERVICE).toBe(`QuoteApiService`);
  });

  it(`should have a member "QUOTE_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.QUOTE_CONFIG_CORE_SERVICE).toBe(`QuoteConfigCoreService`);
  });

  it(`should have a member "QUOTE_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.QUOTE_CONFIG_MUTATOR_SERVICE).toBe(`QuoteConfigMutatorService`);
  });

  it(`should have a member "QUOTE_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.QUOTE_CONFIG_SERVICE).toBe(`QuoteConfigService`);
  });

  it(`should have a member "QUOTE_ERROR_API_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.QUOTE_ERROR_API_SERVICE).toBe(`QuoteErrorApiService`);
  });

  it(`should have a member "QUOTE_RANDOM_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.QUOTE_RANDOM_SERVICE).toBe(`QuoteRandomService`);
  });

  it(`should have a member "RELEASE_TYPE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.RELEASE_TYPE_SERVICE).toBe(`ReleaseTypeService`);
  });

  it(`should have a member "SERVER_CONFIG_CORE_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.SERVER_CONFIG_CORE_SERVICE).toBe(`ServerConfigCoreService`);
  });

  it(`should have a member "SERVER_CONFIG_MUTATOR_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.SERVER_CONFIG_MUTATOR_SERVICE).toBe(`ServerConfigMutatorService`);
  });

  it(`should have a member "SERVER_CONFIG_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.SERVER_CONFIG_SERVICE).toBe(`ServerConfigService`);
  });

  it(`should have a member "SERVER_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.SERVER_SERVICE).toBe(`ServerService`);
  });

  it(`should have a member "TIME_SERVICE"`, (): void => {
    expect.assertions(1);

    expect(ServiceNameEnum.TIME_SERVICE).toBe(`TimeService`);
  });
});
