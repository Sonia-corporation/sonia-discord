import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
} from "discord.js";
import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ColorEnum } from "../../../../../../../../enums/color.enum";
import { IconEnum } from "../../../../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../../core/services/core-event.service";
import { DiscordSoniaService } from "../../../../../../users/services/discord-sonia.service";
import { IDiscordCommandFlagDuplicated } from "../../../../../interfaces/commands/flags/discord-command-flag-duplicated";
import { IDiscordCommandFlagsDuplicated } from "../../../../../types/commands/flags/discord-command-flags-duplicated";
import { DiscordMessageConfigService } from "../../../../config/discord-message-config.service";
import { DiscordMessageCommandCliErrorService } from "../../../discord-message-command-cli-error.service";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "../../features/noon/constants/discord-message-command-feature-noon-flags";
import { DiscordMessageCommandFeatureDuplicatedFlagsErrorService } from "./discord-message-command-feature-duplicated-flags-error.service";

describe(`DiscordMessageCommandFeatureDuplicatedFlagsErrorService`, (): void => {
  let service: DiscordMessageCommandFeatureDuplicatedFlagsErrorService;
  let coreEventService: CoreEventService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageCommandCliErrorService: DiscordMessageCommandCliErrorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageCommandCliErrorService = DiscordMessageCommandCliErrorService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureDuplicatedFlagsError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureDuplicatedFlagsErrorService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandFeatureDuplicatedFlagsErrorService)
      );
    });

    it(`should return the created DiscordMessageCommandFeatureDuplicatedFlagsError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureDuplicatedFlagsErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureDuplicatedFlagsError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureDuplicatedFlagsErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_DUPLICATED_FLAGS_ERROR_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let flagsDuplicated: IDiscordCommandFlagsDuplicated;

    let discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureDuplicatedFlagsErrorService();
      flagsDuplicated = createMock<IDiscordCommandFlagsDuplicated>();

      discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy = jest.spyOn(
        discordMessageCommandCliErrorService,
        `getCliErrorMessageResponse`
      );
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCliErrorImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(
        discordSoniaService,
        `getImageUrl`
      );
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCliErrorImageUrl`
      );
      jest
        .spyOn(
          DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS,
          `getRandomFlagUsageExample`
        )
        .mockReturnValue(`--dummy-flag=dummy-value`);
    });

    it(`should get the CLI error message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.getMessageResponse(flagsDuplicated);

      expect(
        discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy
      ).toHaveBeenCalledWith();
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createMock<
        MessageEmbedAuthor
      >();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(
        messageEmbedAuthor
      );

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy.mockReturnValue(
        ColorEnum.CANDY
      );

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when there is one given duplicated flag`, (): void => {
      beforeEach((): void => {
        flagsDuplicated = [createMock<IDiscordCommandFlagDuplicated>()];
      });

      it(`should return a Discord message response embed with a description indicating that one duplicated flag has been found`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.description).toStrictEqual(
          `**1** duplicated flag found.`
        );
      });

      it(`should return a Discord message response embed with 1 field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields).toHaveLength(1);
      });

      it(`should return a Discord message response embed with the fields containing the duplicated flags`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[0]).toStrictEqual({
          inline: true,
          name: flagsDuplicated[0].name,
          value: flagsDuplicated[0].description,
        } as EmbedFieldData);
      });
    });

    describe(`when there is three given duplicated flags`, (): void => {
      beforeEach((): void => {
        flagsDuplicated = [
          createMock<IDiscordCommandFlagDuplicated>(),
          createMock<IDiscordCommandFlagDuplicated>(),
          createMock<IDiscordCommandFlagDuplicated>(),
        ];
      });

      it(`should return a Discord message response embed with a description indicating that three duplicated flags have been found`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.description).toStrictEqual(
          `**3** duplicated flags found.`
        );
      });

      it(`should return a Discord message response embed with 3 fields`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields).toHaveLength(3);
      });

      it(`should return a Discord message response embed with the fields containing the duplicated flags`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[0]).toStrictEqual({
          inline: true,
          name: flagsDuplicated[0].name,
          value: flagsDuplicated[0].description,
        } as EmbedFieldData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[1]).toStrictEqual({
          inline: true,
          name: flagsDuplicated[1].name,
          value: flagsDuplicated[1].description,
        } as EmbedFieldData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[2]).toStrictEqual({
          inline: true,
          name: flagsDuplicated[2].name,
          value: flagsDuplicated[2].description,
        } as EmbedFieldData);
      });
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `Invalid feature command`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: undefined,
          text: `Invalid feature command`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsDuplicated);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `Invalid feature command`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy.mockReturnValue(
        IconEnum.ARTIFICIAL_INTELLIGENCE
      );

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<
      void
    > => {
      expect.assertions(2);

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(moment(result.options.embed.timestamp).isValid()).toStrictEqual(
        true
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(moment(result.options.embed.timestamp).fromNow()).toStrictEqual(
        `a few seconds ago`
      );
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<
      void
    > => {
      expect.assertions(1);

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.title).toStrictEqual(
        `I can not handle your request`
      );
    });

    it(`should return a Discord message response splitted`, async (): Promise<
      void
    > => {
      expect.assertions(1);

      const result = await service.getMessageResponse(flagsDuplicated);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.split).toStrictEqual(true);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<
      void
    > => {
      expect.assertions(1);

      const result = await service.getMessageResponse(flagsDuplicated);

      expect(result.response).toStrictEqual(``);
    });
  });
});
