import { QuoteErrorApiService } from './quote-error-api.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { IDiscordMessageResponse } from '../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandCliErrorService } from '../../discord/messages/services/command/discord-message-command-cli-error.service';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`QuoteErrorApiService`, (): void => {
  let service: QuoteErrorApiService;
  let coreEventService: CoreEventService;
  let discordMessageCommandCliErrorService: DiscordMessageCommandCliErrorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordMessageCommandCliErrorService = DiscordMessageCommandCliErrorService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a QuoteErrorApi service`, (): void => {
      expect.assertions(1);

      service = QuoteErrorApiService.getInstance();

      expect(service).toStrictEqual(expect.any(QuoteErrorApiService));
    });

    it(`should return the created QuoteErrorApi service`, (): void => {
      expect.assertions(1);

      const result = QuoteErrorApiService.getInstance();

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

    it(`should notify the QuoteErrorApi service creation`, (): void => {
      expect.assertions(2);

      service = new QuoteErrorApiService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.QUOTE_ERROR_API_SERVICE);
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let error: IQuoteErrorApi;

    let discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new QuoteErrorApiService();
      error = createHydratedMock<IQuoteErrorApi>({
        message: `dummy-message`,
      });

      discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy = jest
        .spyOn(discordMessageCommandCliErrorService, `getCliErrorMessageResponse`)
        .mockRejectedValue(new Error(`getCliErrorMessageResponse error`));
    });

    it(`should fetch an error message response from the CLI`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getMessageResponse(error)).rejects.toThrow(new Error(`getCliErrorMessageResponse error`));

      expect(discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the error message response failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy.mockRejectedValue(
          new Error(`getCliErrorMessageResponse error`)
        );
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse(error)).rejects.toThrow(new Error(`getCliErrorMessageResponse error`));
      });
    });

    describe(`when the error message response was successfully fetched`, (): void => {
      let discordMessageResponse: IDiscordMessageResponse;

      beforeEach((): void => {
        discordMessageResponse = createHydratedMock<IDiscordMessageResponse>({
          options: {
            embeds: [
              {
                description: `dummy-description`,
                title: `dummy-title`,
              },
            ],
          },
        });

        discordMessageCommandCliErrorServiceGetCliErrorMessageResponseSpy.mockResolvedValue(discordMessageResponse);
      });

      it(`should return an error message response with a specific description`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(error);

        expect(result.options.embeds?.[0]?.description).toStrictEqual(error.message);
      });

      it(`should return an error message response with a specific title`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(error);

        expect(result.options.embeds?.[0]?.title).toBe(`Oops, something went wrong`);
      });
    });
  });
});
