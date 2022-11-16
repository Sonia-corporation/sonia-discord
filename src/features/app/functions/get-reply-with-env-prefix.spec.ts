import { getReplyWithEnvPrefix } from './get-reply-with-env-prefix';
import { ProfileConfigService } from '../../profile/services/config/profile-config.service';
import { AppConfigService } from '../services/config/app-config.service';

describe(`getReplyWithEnvPrefix()`, (): void => {
  let response: string;
  let appConfigService: AppConfigService;
  let profileConfigService: ProfileConfigService;

  let appConfigServiceIsProductionSpy: jest.SpyInstance;
  let profileConfigServiceGetDiscordIdSpy: jest.SpyInstance;
  let profileConfigServiceGetNickname: jest.SpyInstance;

  beforeEach((): void => {
    response = `dummy-response`;
    appConfigService = AppConfigService.getInstance();
    profileConfigService = ProfileConfigService.getInstance();

    appConfigServiceIsProductionSpy = jest.spyOn(appConfigService, `isProduction`).mockImplementation();
    profileConfigServiceGetDiscordIdSpy = jest.spyOn(profileConfigService, `getDiscordId`).mockReturnValue(null);
    profileConfigServiceGetNickname = jest.spyOn(profileConfigService, `getNickname`).mockReturnValue(null);
  });

  describe(`when the app is in production`, (): void => {
    beforeEach((): void => {
      appConfigServiceIsProductionSpy.mockReturnValue(true);
    });

    it(`should return the same response`, (): void => {
      expect.assertions(1);

      const result = getReplyWithEnvPrefix(response);

      expect(result).toBe(`dummy-response`);
    });
  });

  describe(`when the app is not in production`, (): void => {
    beforeEach((): void => {
      appConfigServiceIsProductionSpy.mockReturnValue(false);
    });

    describe(`when the Discord id is null`, (): void => {
      beforeEach((): void => {
        profileConfigServiceGetDiscordIdSpy.mockReturnValue(null);
      });

      it(`should return the response with the dev prefix`, (): void => {
        expect.assertions(1);

        const result = getReplyWithEnvPrefix(response);

        expect(result).toBe(`**[dev]** dummy-response`);
      });
    });

    describe(`when the current developer Discord id is set`, (): void => {
      beforeEach((): void => {
        profileConfigServiceGetDiscordIdSpy.mockReturnValue(`dummy-discord-id`);
      });

      describe(`when the current developer nickname is null`, (): void => {
        beforeEach((): void => {
          profileConfigServiceGetNickname.mockReturnValue(null);
        });

        it(`should return the response with the dev prefix and with the current developer Discord id mentioned`, (): void => {
          expect.assertions(1);

          const result = getReplyWithEnvPrefix(response);

          expect(result).toBe(`**[dev - <@!dummy-discord-id>]** dummy-response`);
        });
      });

      describe(`when the current developer nickname is set`, (): void => {
        beforeEach((): void => {
          profileConfigServiceGetNickname.mockReturnValue(`dummy-nickname`);
        });

        it(`should return the response with the dev prefix and with the current developer Discord id mentioned`, (): void => {
          expect.assertions(1);

          const result = getReplyWithEnvPrefix(response);

          expect(result).toBe(`**[dev - <@!dummy-discord-id>]** dummy-response`);
        });
      });
    });

    describe(`when the current developer nickname is set`, (): void => {
      beforeEach((): void => {
        profileConfigServiceGetNickname.mockReturnValue(`dummy-nickname`);
      });

      it(`should return the response with the dev prefix and with the current developer nickname as prefix`, (): void => {
        expect.assertions(1);

        const result = getReplyWithEnvPrefix(response);

        expect(result).toBe(`**[dev - dummy-nickname]** dummy-response`);
      });
    });
  });
});
