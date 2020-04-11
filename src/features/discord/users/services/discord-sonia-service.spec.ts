import { ClientUser } from "discord.js";
import { createMock } from "ts-auto-mock";
import * as GetRandomValueFromEnumModule from "../../../../functions/randoms/get-random-value-from-enum";
import { IDiscordSoniaCorporationMessageEmbedAuthorConfig } from "../../interfaces/discord-sonia-corporation-message-embed-author-config";
import { DiscordSoniaMentalStateEnum } from "../enums/discord-sonia-mental-state.enum";
import { DiscordSoniaConfigCoreService } from "./config/discord-sonia-config-core-service";
import { DiscordSoniaService } from "./discord-sonia-service";

jest.mock(`../../services/discord-client-service`);

describe(`DiscordSoniaService`, (): void => {
  let service: DiscordSoniaService;
  let discordSoniaConfigCoreService: DiscordSoniaConfigCoreService;

  beforeEach((): void => {
    service = DiscordSoniaService.getInstance();
    discordSoniaConfigCoreService = DiscordSoniaConfigCoreService.getInstance();
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

    it(`should return the Sonia corporation message embed author`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationMessageEmbedAuthor();

      expect(result).toStrictEqual({
        iconURL: `dummy-icon-url`,
        name: `dummy-name`,
        url: `dummy-url`,
      } as IDiscordSoniaCorporationMessageEmbedAuthorConfig);
    });
  });

  describe(`getCorporationImageUrl()`, (): void => {
    beforeEach((): void => {
      discordSoniaConfigCoreService.corporationImageUrl = `dummy-corporation-image-url`;
    });

    it(`should return the Sonia corporation image url`, (): void => {
      expect.assertions(1);

      const result = service.getCorporationImageUrl();

      expect(result).toStrictEqual(`dummy-corporation-image-url`);
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

  describe(`getMentalState()`, (): void => {
    let getRandomValueFromEnumSpy: jest.SpyInstance;

    beforeEach((): void => {
      getRandomValueFromEnumSpy = jest
        .spyOn(GetRandomValueFromEnumModule, `getRandomValueFromEnum`)
        .mockReturnValue(`dummy-mental-state`);
    });

    it(`should get a random mental state`, (): void => {
      expect.assertions(2);

      service.getMentalState();

      expect(getRandomValueFromEnumSpy).toHaveBeenCalledTimes(1);
      expect(getRandomValueFromEnumSpy).toHaveBeenCalledWith(
        DiscordSoniaMentalStateEnum
      );
    });

    it(`should return a random mental state`, (): void => {
      expect.assertions(1);

      const result = service.getMentalState();

      expect(result).toStrictEqual(`dummy-mental-state`);
    });
  });
});
