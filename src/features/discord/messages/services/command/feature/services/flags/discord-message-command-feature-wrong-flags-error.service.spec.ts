import { DiscordMessageCommandFeatureWrongFlagsErrorService } from './discord-message-command-feature-wrong-flags-error.service';
import { ColorEnum } from '../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../core/services/core-event.service';
import { DiscordSoniaService } from '../../../../../../users/services/discord-sonia.service';
import { IDiscordCommandFlagError } from '../../../../../interfaces/commands/flags/discord-command-flag-error';
import { IDiscordCommandFlagsErrors } from '../../../../../types/commands/flags/discord-command-flags-errors';
import { DiscordMessageConfigService } from '../../../../config/discord-message-config.service';
import { DiscordMessageCommandCliErrorService } from '../../../discord-message-command-cli-error.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from '../../features/noon/constants/discord-message-command-feature-noon-flags';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordMessageCommandFeatureWrongFlagsErrorService`, (): void => {
  let service: DiscordMessageCommandFeatureWrongFlagsErrorService;
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
    it(`should create a DiscordMessageCommandFeatureWrongFlagsError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureWrongFlagsErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureWrongFlagsErrorService));
    });

    it(`should return the created DiscordMessageCommandFeatureWrongFlagsError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureWrongFlagsErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureWrongFlagsError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureWrongFlagsErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_WRONG_FLAGS_ERROR_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let flagsErrors: IDiscordCommandFlagsErrors;

    let discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureWrongFlagsErrorService();
      flagsErrors = createHydratedMock<IDiscordCommandFlagsErrors>();

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
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCliErrorImageUrl`
      );
      jest
        .spyOn(DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS, `getRandomFlagUsageExample`)
        .mockReturnValue(`--dummy-flag=dummy-value`);
    });

    it(`should get the CLI error message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.getMessageResponse(flagsErrors);

      expect(discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy).toHaveBeenCalledWith();
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when there is one given flag error`, (): void => {
      beforeEach((): void => {
        flagsErrors = [createHydratedMock<IDiscordCommandFlagError>()];
      });

      it(`should return a Discord message response embed with a description indicating that one error has been found`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.description).toStrictEqual(`**1** error found.`);
      });

      it(`should return a Discord message response embed with 1 field`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.fields).toHaveLength(1);
      });

      it(`should return a Discord message response embed with the fields containing the flags errors`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          inline: false,
          name: flagsErrors[0].name,
          value: flagsErrors[0].description,
        } as EmbedFieldData);
      });
    });

    describe(`when there is three given flags errors`, (): void => {
      beforeEach((): void => {
        flagsErrors = [
          createHydratedMock<IDiscordCommandFlagError>(),
          createHydratedMock<IDiscordCommandFlagError>(),
          createHydratedMock<IDiscordCommandFlagError>(),
        ];
      });

      it(`should return a Discord message response embed with a description indicating that three errors have been found`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.description).toStrictEqual(`**3** errors found.`);
      });

      it(`should return a Discord message response embed with 3 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.fields).toHaveLength(3);
      });

      it(`should return a Discord message response embed with the fields containing the flags errors`, async (): Promise<void> => {
        expect.assertions(3);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          inline: false,
          name: flagsErrors[0].name,
          value: flagsErrors[0].description,
        } as EmbedFieldData);

        expect(result.options.embed?.fields?.[1]).toStrictEqual({
          inline: false,
          name: flagsErrors[1].name,
          value: flagsErrors[1].description,
        } as EmbedFieldData);

        expect(result.options.embed?.fields?.[2]).toStrictEqual({
          inline: false,
          name: flagsErrors[2].name,
          value: flagsErrors[2].description,
        } as EmbedFieldData);
      });
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.options.embed?.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `Invalid feature command`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: undefined,
          text: `Invalid feature command`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(flagsErrors);

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `Invalid feature command`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.options.embed?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse(flagsErrors);

      expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);

      expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.options.embed?.title).toStrictEqual(`I can not handle your request.`);
    });

    it(`should return a Discord message response not split`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(flagsErrors);

      expect(result.response).toStrictEqual(``);
    });
  });
});
