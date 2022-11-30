import { DiscordMessageCommandHeartbeatUpdateErrorService } from './discord-message-command-heartbeat-update-error.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { IAnyDiscordMessage } from '../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../helpers/discord-message-error.service';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordMessageCommandHeartbeatUpdateErrorService`, (): void => {
  let service: DiscordMessageCommandHeartbeatUpdateErrorService;
  let coreEventService: CoreEventService;
  let discordMessageErrorService: DiscordMessageErrorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandHeartbeatUpdateError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandHeartbeatUpdateErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandHeartbeatUpdateErrorService));
    });

    it(`should return the created DiscordMessageCommandHeartbeatUpdateError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandHeartbeatUpdateErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandHeartbeatUpdateError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandHeartbeatUpdateErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HEARTBEAT_UPDATE_ERROR_SERVICE
      );
    });
  });

  describe(`handleError()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let error: Error;

    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandHeartbeatUpdateErrorService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>();
      error = new Error(`error`);

      discordMessageErrorServiceHandleErrorSpy = jest
        .spyOn(discordMessageErrorService, `handleError`)
        .mockImplementation();
    });

    it(`should should an error message on the channel and on the Sonia guild errors channel`, (): void => {
      expect.assertions(2);

      service.handleError(anyDiscordMessage, error);

      expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
        error,
        anyDiscordMessage,
        `failed to update the roundtrip latency of the heartbeat command`
      );
    });
  });
});
