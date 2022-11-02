import { DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService } from './discord-message-command-feature-release-notes-enabled-success-flag.service';
import { ServiceNameEnum } from '../../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../../core/services/core-event.service';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlag service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService));
    });

    it(`should return the created DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlag service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlag service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED_SUCCESS_FLAG_SERVICE
      );
    });
  });

  describe(`getFlag()`, (): void => {
    let shouldEnable: boolean;
    let isEnabled: boolean | undefined;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService();
    });

    describe(`when the current state is undefined`, (): void => {
      beforeEach((): void => {
        isEnabled = undefined;
      });

      describe(`when the new state is enabled`, (): void => {
        beforeEach((): void => {
          shouldEnable = true;
        });

        it(`should return a message indicating that the new state is enabled and the old one was not configured yet`, (): void => {
          expect.assertions(1);

          const result = service.getFlag(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The release notes feature was not configured yet and is now enabled on this channel. A message will be sent each time a new release is deployed.`,
            name: `Release notes feature enabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });

      describe(`when the new state is disabled`, (): void => {
        beforeEach((): void => {
          shouldEnable = false;
        });

        it(`should return a message indicating that the new state is disabled and the old one was not configured yet`, (): void => {
          expect.assertions(1);

          const result = service.getFlag(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The release notes feature was not configured yet and is now disabled on this channel.`,
            name: `Release notes feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });

    describe(`when the current state is true`, (): void => {
      beforeEach((): void => {
        isEnabled = true;
      });

      describe(`when the new state is enabled`, (): void => {
        beforeEach((): void => {
          shouldEnable = true;
        });

        it(`should return a message indicating that the new state is enabled and the old one was enabled`, (): void => {
          expect.assertions(1);

          const result = service.getFlag(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The release notes feature was already enabled on this channel. A message will be sent each time a new release is deployed.`,
            name: `Release notes feature enabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });

      describe(`when the new state is disabled`, (): void => {
        beforeEach((): void => {
          shouldEnable = false;
        });

        it(`should return a message indicating that the new state is disabled and the old one was enabled`, (): void => {
          expect.assertions(1);

          const result = service.getFlag(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The release notes feature is now disabled on this channel.`,
            name: `Release notes feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });

    describe(`when the current state is false`, (): void => {
      beforeEach((): void => {
        isEnabled = false;
      });

      describe(`when the new state is enabled`, (): void => {
        beforeEach((): void => {
          shouldEnable = true;
        });

        it(`should return a message indicating that the new state is enabled and the old one was disabled`, (): void => {
          expect.assertions(1);

          const result = service.getFlag(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The release notes feature is now enabled on this channel. A message will be sent each time a new release is deployed.`,
            name: `Release notes feature enabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });

      describe(`when the new state is disabled`, (): void => {
        beforeEach((): void => {
          shouldEnable = false;
        });

        it(`should return a message indicating that the new state is disabled and the old one was disabled`, (): void => {
          expect.assertions(1);

          const result = service.getFlag(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The release notes feature was already disabled on this channel.`,
            name: `Release notes feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });
  });
});
