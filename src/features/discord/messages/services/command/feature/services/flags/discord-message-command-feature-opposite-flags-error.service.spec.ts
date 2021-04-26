import { DiscordMessageCommandFeatureOppositeFlagsErrorService } from './discord-message-command-feature-opposite-flags-error.service';
import { ColorEnum } from '../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../core/services/core-event.service';
import { DiscordSoniaService } from '../../../../../../users/services/discord-sonia.service';
import { IDiscordCommandFlagOpposite } from '../../../../../interfaces/commands/flags/discord-command-flag-opposite';
import { IDiscordCommandFlagsOpposite } from '../../../../../types/commands/flags/discord-command-flags-opposite';
import { DiscordMessageConfigService } from '../../../../config/discord-message-config.service';
import { DiscordMessageCommandCliErrorService } from '../../../discord-message-command-cli-error.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from '../../features/noon/constants/discord-message-command-feature-noon-flags';
import { EmbedFieldData, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordMessageCommandFeatureOppositeFlagsErrorService`, (): void => {
  let service: DiscordMessageCommandFeatureOppositeFlagsErrorService;
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
    it(`should create a DiscordMessageCommandFeatureOppositeFlagsError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureOppositeFlagsErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureOppositeFlagsErrorService));
    });

    it(`should return the created DiscordMessageCommandFeatureOppositeFlagsError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureOppositeFlagsErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureOppositeFlagsError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureOppositeFlagsErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_OPPOSITE_FLAGS_ERROR_SERVICE
      );
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let oppositeFlags: IDiscordCommandFlagsOpposite;

    let discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureOppositeFlagsErrorService();
      oppositeFlags = createHydratedMock<IDiscordCommandFlagsOpposite>();

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

      await service.getMessageResponse(oppositeFlags);

      expect(discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy).toHaveBeenCalledWith();
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when there is one given opposite flag`, (): void => {
      beforeEach((): void => {
        oppositeFlags = [createHydratedMock<IDiscordCommandFlagOpposite>()];
      });

      it(`should return a Discord message response embed with a description indicating that one opposite flag has been found`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.description).toStrictEqual(`**1** opposite flag error found.`);
      });

      it(`should return a Discord message response embed with 2 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.fields).toHaveLength(2);
      });

      it(`should return a Discord message response embed with the fields containing the opposite flags`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          inline: false,
          name: oppositeFlags[0].name,
          value: oppositeFlags[0].description,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed field containing a hint to solve this error`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.fields?.[1]).toStrictEqual({
          name: `How to solve this?`,
          value: `I am here to help you but do not mess with me!\nTry again but remove the extra opposite flags which makes no sense since you can not combine them!\nAlso you can use the \`--help\` flag if want my help!`,
        } as EmbedFieldData);
      });
    });

    describe(`when there is three given opposite flags`, (): void => {
      beforeEach((): void => {
        oppositeFlags = [
          createHydratedMock<IDiscordCommandFlagOpposite>(),
          createHydratedMock<IDiscordCommandFlagOpposite>(),
          createHydratedMock<IDiscordCommandFlagOpposite>(),
        ];
      });

      it(`should return a Discord message response embed with a description indicating that three opposite flags have been found`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.description).toStrictEqual(`**3** opposite flag errors found.`);
      });

      it(`should return a Discord message response embed with 4 fields`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.fields).toHaveLength(4);
      });

      it(`should return a Discord message response embed with the fields containing the opposite flags`, async (): Promise<void> => {
        expect.assertions(3);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.fields?.[0]).toStrictEqual({
          inline: false,
          name: oppositeFlags[0].name,
          value: oppositeFlags[0].description,
        } as EmbedFieldData);

        expect(result.options.embed?.fields?.[1]).toStrictEqual({
          inline: false,
          name: oppositeFlags[1].name,
          value: oppositeFlags[1].description,
        } as EmbedFieldData);

        expect(result.options.embed?.fields?.[2]).toStrictEqual({
          inline: false,
          name: oppositeFlags[2].name,
          value: oppositeFlags[2].description,
        } as EmbedFieldData);
      });

      it(`should return a Discord message response embed field containing a hint to solve this error`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.fields?.[3]).toStrictEqual({
          name: `How to solve this?`,
          value: `I am here to help you but do not mess with me!\nTry again but remove the extra opposite flags which makes no sense since you can not combine them!\nAlso you can use the \`--help\` flag if want my help!`,
        } as EmbedFieldData);
      });
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse(oppositeFlags);

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

        const result = await service.getMessageResponse(oppositeFlags);

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

        const result = await service.getMessageResponse(oppositeFlags);

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `Invalid feature command`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCliErrorImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(result.options.embed?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);

      expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(result.options.embed?.title).toStrictEqual(`I can not handle your request.`);
    });

    it(`should return a Discord message response not split`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(oppositeFlags);

      expect(result.response).toStrictEqual(``);
    });
  });
});
