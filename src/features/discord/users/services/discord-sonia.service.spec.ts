import { ClientUser, MessageEmbedAuthor } from "discord.js";
import { createMock } from "ts-auto-mock";
import { IconEnum } from "../../../../enums/icon.enum";
import * as GetRandomValueFromEnumModule from "../../../../functions/randoms/get-random-value-from-enum";
import { AppConfigCoreService } from "../../../app/services/config/app-config-core.service";
import { ProfileConfigCoreService } from "../../../profile/services/config/profile-config-core.service";
import { DiscordSoniaEmotionalStateEnum } from "../enums/discord-sonia-emotional-state.enum";
import { DiscordSoniaConfigCoreService } from "./config/discord-sonia-config-core.service";
import { DiscordSoniaService } from "./discord-sonia.service";

jest.mock(`../../services/discord-client.service`);

describe(`DiscordSoniaService`, (): void => {
  let service: DiscordSoniaService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;
  let profileConfigCoreService: ProfileConfigCoreService;
  let appConfigCoreService: AppConfigCoreService;

  beforeEach((): void => {
    service = DiscordSoniaService.getInstance();
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
    profileConfigCoreService = ProfileConfigCoreService.getInstance();
    appConfigCoreService = AppConfigCoreService.getInstance();
  });

  describe(`isSonia()`, (): void => {
    let id: string;

    describe(`when the Sonia id is "dummy-id"`, (): void => {
      beforeEach((): void => {
        discordSoniaConfigCoreService.id = `dummy-id`;
      });

      describe(`when the given id an empty string`, (): void => {
        beforeEach((): void => {
          id = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isSonia(id);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given id is "dummy"`, (): void => {
        beforeEach((): void => {
          id = `dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isSonia(id);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given id is "dummy-id"`, (): void => {
        beforeEach((): void => {
          id = `dummy-id`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isSonia(id);

          expect(result).toStrictEqual(true);
        });
      });
    });

    describe(`when the Sonia id is "id"`, (): void => {
      beforeEach((): void => {
        discordSoniaConfigCoreService.id = `id`;
      });

      describe(`when the given id an empty string`, (): void => {
        beforeEach((): void => {
          id = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isSonia(id);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given id is "dummy"`, (): void => {
        beforeEach((): void => {
          id = `dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isSonia(id);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given id is "id"`, (): void => {
        beforeEach((): void => {
          id = `id`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isSonia(id);

          expect(result).toStrictEqual(true);
        });
      });
    });
  });

  describe(`getSonia()`, (): void => {
    it(`should return the Discord client`, (): void => {
      expect.assertions(1);

      const result = service.getSonia();

      expect(result).toStrictEqual({
        username: `dummy-username`,
      });
    });
  });

  describe(`getFullName()`, (): void => {
    let getSoniaSpy: jest.SpyInstance;

    beforeEach((): void => {
      getSoniaSpy = jest.spyOn(service, `getSonia`).mockImplementation();
    });

    describe(`when Sonia is null`, (): void => {
      beforeEach((): void => {
        getSoniaSpy.mockReturnValue(null);
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = service.getFullName();

        expect(result).toBeNull();
      });
    });

    describe(`when Sonia is valid`, (): void => {
      beforeEach((): void => {
        getSoniaSpy.mockReturnValue(
          createMock<ClientUser>({
            discriminator: `dummy-discriminator`,
            username: `dummy-username`,
          })
        );
      });

      it(`should return the Sonia username followed by a "#" and followed by the Sonia discriminator`, (): void => {
        expect.assertions(1);

        const result = service.getFullName();

        expect(result).toStrictEqual(`dummy-username#dummy-discriminator`);
      });
    });
  });

  describe(`isValid()`, (): void => {
    let sonia: unknown;

    describe(`when the given value is undefined`, (): void => {
      beforeEach((): void => {
        sonia = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(sonia);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is null`, (): void => {
      beforeEach((): void => {
        sonia = null;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(sonia);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is an empty object`, (): void => {
      beforeEach((): void => {
        sonia = {};
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(sonia);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is an object`, (): void => {
      beforeEach((): void => {
        sonia = {
          key: `value`,
        };
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(sonia);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is a "ClientUser" instance`, (): void => {
      beforeEach((): void => {
        sonia = createMock<ClientUser>();
      });

      // @todo fix it omg this should works
      it.skip(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(sonia);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`getCorporationMessageEmbedAuthor()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationMessageEmbedAuthor = {
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      };
    });

    describe(`when the app is in production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = true;
      });

      describe(`when the profile nickname is null`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = null;
        });

        it(`should return the Sonia corporation message embed author`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });

      describe(`when the profile nickname is an empty string`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = ``;
        });

        it(`should return the Sonia corporation message embed author`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });

      describe(`when the profile nickname is "dummy-nickname"`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = `dummy-nickname`;
        });

        it(`should return the Sonia corporation message embed author`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });

      describe(`when the profile nickname is "nickname"`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = `nickname`;
        });

        it(`should return the Sonia corporation message embed author`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });
    });

    describe(`when the app is not in production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = false;
      });

      describe(`when the profile nickname is null`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = null;
        });

        it(`should return the Sonia corporation message embed author with a dev prefix for the name`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `[dev] dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });

      describe(`when the profile nickname is an empty string`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = ``;
        });

        it(`should return the Sonia corporation message embed author with a dev prefix for the name`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `[dev] dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });

      describe(`when the profile nickname is "dummy-nickname"`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = `dummy-nickname`;
        });

        it(`should return the Sonia corporation message embed author with a dev and nickname prefix for the name`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `[dev - dummy-nickname] dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });

      describe(`when the profile nickname is "nickname"`, (): void => {
        beforeEach((): void => {
          profileConfigCoreService.nickname = `nickname`;
        });

        it(`should return the Sonia corporation message embed author with a dev and nickname prefix for the name`, (): void => {
          expect.assertions(1);

          const result = service.getCorporationMessageEmbedAuthor();

          expect(result).toStrictEqual({
            iconURL: `dummy-icon-url`,
            name: `[dev - nickname] dummy-name`,
            url: `dummy-url`,
          } as MessageEmbedAuthor);
        });
      });
    });
  });

  describe(`getCorporationImageUrl()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationImageUrl =
        IconEnum.WARNING_SHIELD;
    });

    it(`should return the Sonia corporation image url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationImageUrl();

      expect(result).toStrictEqual(IconEnum.WARNING_SHIELD);
    });
  });

  describe(`getImageUrl()`, (): void => {
    let getSoniaSpy: jest.SpyInstance;

    beforeEach((): void => {
      getSoniaSpy = jest.spyOn(service, `getSonia`).mockImplementation();
    });

    describe(`when Sonia is null`, (): void => {
      beforeEach((): void => {
        getSoniaSpy.mockReturnValue(null);
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = service.getImageUrl();

        expect(result).toBeNull();
      });
    });

    describe(`when Sonia is valid`, (): void => {
      beforeEach((): void => {
        getSoniaSpy.mockReturnValue(
          createMock<ClientUser>({
            displayAvatarURL: (): string => `dummy-image-url`,
          })
        );
      });

      it(`should return the Sonia image url`, (): void => {
        expect.assertions(1);

        const result = service.getImageUrl();

        expect(result).toStrictEqual(`dummy-image-url`);
      });
    });
  });

  describe(`getEmotionalState()`, (): void => {
    let getRandomValueFromEnumSpy: jest.SpyInstance;

    beforeEach((): void => {
      getRandomValueFromEnumSpy = jest
        .spyOn(GetRandomValueFromEnumModule, `getRandomValueFromEnum`)
        .mockReturnValue(`dummy-emotional-state`);
    });

    it(`should get a random emotional state`, (): void => {
      expect.assertions(2);

      service.getEmotionalState();

      expect(getRandomValueFromEnumSpy).toHaveBeenCalledTimes(1);
      expect(getRandomValueFromEnumSpy).toHaveBeenCalledWith(
        DiscordSoniaEmotionalStateEnum
      );
    });

    it(`should return a random emotional state`, (): void => {
      expect.assertions(1);

      const result = service.getEmotionalState();

      expect(result).toStrictEqual(`dummy-emotional-state`);
    });
  });
});
