import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordMessageScheduleIlEstMidiService } from "./discord-message-schedule-il-est-midi.service";

describe(`DiscordMessageScheduleIlEstMidiService`, (): void => {
  let service: DiscordMessageScheduleIlEstMidiService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageScheduleIlEstMidi service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageScheduleIlEstMidiService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageScheduleIlEstMidiService)
      );
    });

    it(`should return the created DiscordMessageScheduleIlEstMidi service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageScheduleIlEstMidiService.getInstance();

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

    it(`should notify the DiscordMessageScheduleIlEstMidi service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageScheduleIlEstMidiService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_IL_EST_MIDI_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let startScheduleSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleIlEstMidiService();

      startScheduleSpy = jest
        .spyOn(service, `startSchedule`)
        .mockImplementation();
    });

    it(`should start the schedule`, (): void => {
      expect.assertions(2);

      service.init();

      expect(startScheduleSpy).toHaveBeenCalledTimes(1);
      expect(startScheduleSpy).toHaveBeenCalledWith();
    });
  });
});
