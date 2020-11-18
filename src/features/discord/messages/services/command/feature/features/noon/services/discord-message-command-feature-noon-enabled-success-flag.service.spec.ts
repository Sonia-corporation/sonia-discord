import { DiscordMessageCommandFeatureNoonEnabledSuccessFlagService } from './discord-message-command-feature-noon-enabled-success-flag.service';
import { ServiceNameEnum } from '../../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../../core/services/core-event.service';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonEnabledSuccessFlagService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonEnabledSuccessFlagService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureNoonEnabledSuccessFlag service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonEnabledSuccessFlagService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureNoonEnabledSuccessFlagService));
    });

    it(`should return the created DiscordMessageCommandFeatureNoonEnabledSuccessFlag service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonEnabledSuccessFlagService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureNoonEnabledSuccessFlag service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonEnabledSuccessFlagService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SUCCESS_FLAG_SERVICE
      );
    });
  });

  describe(`getFlag()`, (): void => {
    let shouldEnable: boolean;
    let isEnabled: boolean | undefined;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabledSuccessFlagService();
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
            description: `The noon feature was not configured yet and is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
            name: `Noon feature enabled`,
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
            description: `The noon feature was not configured yet and is now disabled on this channel.`,
            name: `Noon feature disabled`,
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
            description: `The noon feature was already enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
            name: `Noon feature enabled`,
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
            description: `The noon feature is now disabled on this channel.`,
            name: `Noon feature disabled`,
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
            description: `The noon feature is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
            name: `Noon feature enabled`,
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
            description: `The noon feature was already disabled on this channel.`,
            name: `Noon feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });
  });
});
