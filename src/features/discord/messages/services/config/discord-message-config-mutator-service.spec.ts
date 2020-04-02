import { IConfigUpdateNumber } from "../../../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config-service";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core-service";
import { DiscordMessageConfigMutatorService } from "./discord-message-config-mutator-service";

jest.mock(`../../../../config/services/config-service`);

describe(`DiscordMessageConfigMutatorService`, (): void => {
  let service: DiscordMessageConfigMutatorService;
  let configService: ConfigService;
  let discordMessageConfigCoreService: DiscordMessageConfigCoreService;

  beforeEach((): void => {
    service = DiscordMessageConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
  });

  describe(`updateMessageCommandErrorImageColor()`, (): void => {
    let imageColor: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = 8;
      discordMessageConfigCoreService.command.error.imageColor = 10;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandErrorImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: 8,
        oldValue: 10,
        valueName: `message command error image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command error image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandErrorImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.error.imageColor
      ).toStrictEqual(8);
    });
  });

  describe(`updateMessageCommandErrorImageUrl()`, (): void => {
    let imageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = `dummy-image-url`;
      discordMessageConfigCoreService.command.error.imageUrl = `image-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandErrorImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: `dummy-image-url`,
        oldValue: `image-url`,
        valueName: `message command error image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command error image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandErrorImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.error.imageUrl
      ).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`updateMessageCommandVersionImageColor()`, (): void => {
    let imageColor: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = 8;
      discordMessageConfigCoreService.command.version.imageColor = 10;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: 8,
        oldValue: 10,
        valueName: `message command version image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command version image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.version.imageColor
      ).toStrictEqual(8);
    });
  });

  describe(`updateMessageCommandVersionImageUrl()`, (): void => {
    let imageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = `dummy-image-url`;
      discordMessageConfigCoreService.command.version.imageUrl = `image-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: `dummy-image-url`,
        oldValue: `image-url`,
        valueName: `message command version image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command version image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.version.imageUrl
      ).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`updateMessageErrorImageColor()`, (): void => {
    let imageColor: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = 8;
      discordMessageConfigCoreService.error.imageColor = 10;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageErrorImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: 8,
        oldValue: 10,
        valueName: `message error image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config error image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageColor(imageColor);

      expect(discordMessageConfigCoreService.error.imageColor).toStrictEqual(8);
    });
  });

  describe(`updateMessageErrorImageUrl()`, (): void => {
    let imageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = `dummy-image-url`;
      discordMessageConfigCoreService.error.imageUrl = `image-url`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: `dummy-image-url`,
        oldValue: `image-url`,
        valueName: `message error image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config error image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(discordMessageConfigCoreService.error.imageUrl).toStrictEqual(
        `dummy-image-url`
      );
    });
  });
});
