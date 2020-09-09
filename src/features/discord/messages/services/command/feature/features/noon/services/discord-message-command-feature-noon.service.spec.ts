import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
} from "discord.js";
import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ColorEnum } from "../../../../../../../../../enums/color.enum";
import { IconEnum } from "../../../../../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../../../core/services/core-event.service";
import { DiscordSoniaService } from "../../../../../../../users/services/discord-sonia.service";
import { IDiscordCommandFlagSuccess } from "../../../../../../interfaces/commands/flags/discord-command-flag-success";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { IDiscordCommandFlagsSuccess } from "../../../../../../types/commands/flags/discord-command-flags-success";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAMES } from "../../../constants/discord-message-command-feature-names";
import { DiscordMessageCommandFeatureNameEnum } from "../../../enums/discord-message-command-feature-name.enum";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "../constants/discord-message-command-feature-noon-flags";
import { DiscordMessageCommandFeatureNoonConfigService } from "./config/discord-message-command-feature-noon-config.service";
import { DiscordMessageCommandFeatureNoonService } from "./discord-message-command-feature-noon.service";

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonService;
  let coreEventService: CoreEventService;
  let discordMessageCommandFeatureNoonConfigService: DiscordMessageCommandFeatureNoonConfigService;
  let discordSoniaService: DiscordSoniaService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordMessageCommandFeatureNoonConfigService = DiscordMessageCommandFeatureNoonConfigService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureNoon service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandFeatureNoonService)
      );
    });

    it(`should return the created DiscordMessageCommandFeatureNoon service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureNoon service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE
      );
    });
  });

  describe(`isNoonFeature()`, (): void => {
    let featureName: string | DiscordMessageCommandFeatureNameEnum;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonService();
    });

    describe(`when the given feature name is not the noon feature`, (): void => {
      beforeEach((): void => {
        featureName = `dummy`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isNoonFeature = service.isNoonFeature(featureName);

        expect(isNoonFeature).toStrictEqual(false);
      });
    });

    describe(`when the given feature name is the noon feature`, (): void => {
      beforeEach((): void => {
        featureName = DiscordMessageCommandFeatureNameEnum.NOON;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isNoonFeature = service.isNoonFeature(featureName);

        expect(isNoonFeature).toStrictEqual(true);
      });
    });

    describe(`when the given feature name is the shortcut noon feature`, (): void => {
      beforeEach((): void => {
        featureName = DiscordMessageCommandFeatureNameEnum.N;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isNoonFeature = service.isNoonFeature(featureName);

        expect(isNoonFeature).toStrictEqual(true);
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlags: string;
    let discordCommandFlagsSuccess: IDiscordCommandFlagsSuccess;

    let executeAllSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageColor: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      messageFlags = `--enabled=true -e`;
      discordCommandFlagsSuccess = createMock<IDiscordCommandFlagsSuccess>();

      executeAllSpy = jest
        .spyOn(DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS, `executeAll`)
        .mockResolvedValue(discordCommandFlagsSuccess);
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageColor = jest.spyOn(
        discordMessageCommandFeatureNoonConfigService,
        `getNoonConfigImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(
        discordSoniaService,
        `getImageUrl`
      );
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageUrlSpy = jest.spyOn(
        discordMessageCommandFeatureNoonConfigService,
        `getNoonConfigImageUrl`
      );
      jest
        .spyOn(
          DISCORD_MESSAGE_COMMAND_FEATURE_NAMES,
          `getRandomArgumentUsageExample`
        )
        .mockReturnValue(`noon`);
    });

    it(`should execute all actions in the given message`, async (): Promise<
      void
    > => {
      expect.assertions(2);

      await service.getMessageResponse(anyDiscordMessage, messageFlags);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(executeAllSpy).toHaveBeenCalledTimes(1);
      expect(executeAllSpy).toHaveBeenCalledWith(
        anyDiscordMessage,
        messageFlags
      );
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

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageColor.mockReturnValue(
        ColorEnum.DESERT
      );

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.color).toStrictEqual(ColorEnum.DESERT);
    });

    describe(`when there is one given success flag`, (): void => {
      beforeEach((): void => {
        discordCommandFlagsSuccess = [createMock<IDiscordCommandFlagSuccess>()];

        executeAllSpy.mockResolvedValue(discordCommandFlagsSuccess);
      });

      it(`should return a Discord message response embed with a description indicating that one flag was successful`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.description).toStrictEqual(
          `**1** noon feature option updated.`
        );
      });

      it(`should return a Discord message response embed with 1 field`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields).toHaveLength(1);
      });

      it(`should return a Discord message response embed with the fields containing the flags success`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[0]).toStrictEqual({
          inline: true,
          name: discordCommandFlagsSuccess[0].name,
          value: discordCommandFlagsSuccess[0].description,
        } as EmbedFieldData);
      });
    });

    describe(`when there is three given success flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlagsSuccess = [
          createMock<IDiscordCommandFlagSuccess>(),
          createMock<IDiscordCommandFlagSuccess>(),
          createMock<IDiscordCommandFlagSuccess>(),
        ];

        executeAllSpy.mockResolvedValue(discordCommandFlagsSuccess);
      });

      it(`should return a Discord message response embed with a description indicating that three errors have been found`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.description).toStrictEqual(
          `**3** noon feature options updated.`
        );
      });

      it(`should return a Discord message response embed with 3 fields`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields).toHaveLength(3);
      });

      it(`should return a Discord message response embed with the fields containing the flags success`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[0]).toStrictEqual({
          inline: true,
          name: discordCommandFlagsSuccess[0].name,
          value: discordCommandFlagsSuccess[0].description,
        } as EmbedFieldData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[1]).toStrictEqual({
          inline: true,
          name: discordCommandFlagsSuccess[1].name,
          value: discordCommandFlagsSuccess[1].description,
        } as EmbedFieldData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.fields[2]).toStrictEqual({
          inline: true,
          name: discordCommandFlagsSuccess[2].name,
          value: discordCommandFlagsSuccess[2].description,
        } as EmbedFieldData);
      });
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `Noon feature successfully updated`,
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

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: undefined,
          text: `Noon feature successfully updated`,
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

        const result = await service.getMessageResponse(
          anyDiscordMessage,
          messageFlags
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(result.options.embed.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `Noon feature successfully updated`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<
      void
    > => {
      expect.assertions(1);
      discordMessageCommandFeatureNoonConfigServiceGetNoonConfigImageUrlSpy.mockReturnValue(
        IconEnum.ALARM
      );

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.thumbnail).toStrictEqual({
        url: IconEnum.ALARM,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<
      void
    > => {
      expect.assertions(2);

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

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

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.embed.title).toStrictEqual(`Noon feature updated`);
    });

    it(`should return a Discord message response splitted`, async (): Promise<
      void
    > => {
      expect.assertions(1);

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.options.split).toStrictEqual(true);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<
      void
    > => {
      expect.assertions(1);

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      expect(result.response).toStrictEqual(``);
    });
  });
});
