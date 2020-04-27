import moment from "moment-timezone";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { TimeService } from "./time.service";

describe(`TimeService`, (): void => {
  let service: TimeService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Time service`, (): void => {
      expect.assertions(1);

      service = TimeService.getInstance();

      expect(service).toStrictEqual(expect.any(TimeService));
    });

    it(`should return the created Time service`, (): void => {
      expect.assertions(1);

      const result = TimeService.getInstance();

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

    it(`should notify the Time service creation`, (): void => {
      expect.assertions(2);

      service = new TimeService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.TIME_SERVICE
      );
    });
  });

  describe(`now()`, (): void => {
    let format: string;

    beforeEach((): void => {
      service = TimeService.getInstance();
    });

    describe(`when there is no given format`, (): void => {
      it(`should return now with the default moment format`, (): void => {
        expect.assertions(1);

        const result = service.now();

        // Use from now to avoid a small difference of ms
        // When humanized, it will not make a difference
        expect(moment(result).fromNow()).toStrictEqual(moment().fromNow());
      });
    });

    describe(`when there is no given format is an empty string`, (): void => {
      beforeEach((): void => {
        format = ``;
      });

      it(`should return now with the default moment format`, (): void => {
        expect.assertions(1);

        const result = service.now(format);

        expect(result).toStrictEqual(moment().format());
      });
    });

    describe(`when there is no given format is a specific format`, (): void => {
      beforeEach((): void => {
        format = `d`;
      });

      it(`should return now with the given format`, (): void => {
        expect.assertions(1);

        const result = service.now(format);

        expect(result).toStrictEqual(moment().get(`day`).toString());
      });
    });
  });

  describe(`fromNow()`, (): void => {
    let date: string;
    let isCapitalized: boolean;

    beforeEach((): void => {
      service = TimeService.getInstance();
    });

    describe(`when the given date is an empty string`, (): void => {
      beforeEach((): void => {
        date = ``;
      });

      it(`should return "Invalid date"`, (): void => {
        expect.assertions(1);

        const result = service.fromNow(date);

        expect(result).toStrictEqual(`Invalid date`);
      });

      describe(`when the given capitalized state is true`, (): void => {
        beforeEach((): void => {
          isCapitalized = true;
        });

        it(`should return "Invalid date"`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`Invalid date`);
        });
      });

      describe(`when the given capitalized state is false`, (): void => {
        beforeEach((): void => {
          isCapitalized = false;
        });

        it(`should return "Invalid date"`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`Invalid date`);
        });
      });
    });

    describe(`when the given date is "unknown"`, (): void => {
      beforeEach((): void => {
        date = `unknown`;
      });

      it(`should return "Invalid date"`, (): void => {
        expect.assertions(1);

        const result = service.fromNow(date);

        expect(result).toStrictEqual(`Invalid date`);
      });

      describe(`when the given capitalized state is true`, (): void => {
        beforeEach((): void => {
          isCapitalized = true;
        });

        it(`should return "Invalid date"`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`Invalid date`);
        });
      });

      describe(`when the given capitalized state is false`, (): void => {
        beforeEach((): void => {
          isCapitalized = false;
        });

        it(`should return "Invalid date"`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`Invalid date`);
        });
      });
    });

    describe(`when the given date is a date as now`, (): void => {
      beforeEach((): void => {
        date = moment().format();
      });

      it(`should return a date capitalized and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = service.fromNow(date);

        expect(result).toStrictEqual(`A few seconds ago`);
      });

      describe(`when the given capitalized state is true`, (): void => {
        beforeEach((): void => {
          isCapitalized = true;
        });

        it(`should return a date capitalized and humanized to a few seconds`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`A few seconds ago`);
        });
      });

      describe(`when the given capitalized state is false`, (): void => {
        beforeEach((): void => {
          isCapitalized = false;
        });

        it(`should return a date and humanized to a few seconds`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`a few seconds ago`);
        });
      });
    });

    describe(`when the given date is a date as one hour`, (): void => {
      beforeEach((): void => {
        date = moment().subtract(1, `hour`).format();
      });

      it(`should return a date capitalized and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = service.fromNow(date);

        expect(result).toStrictEqual(`An hour ago`);
      });

      describe(`when the given capitalized state is true`, (): void => {
        beforeEach((): void => {
          isCapitalized = true;
        });

        it(`should return a date capitalized and humanized to an hour`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`An hour ago`);
        });
      });

      describe(`when the given capitalized state is false`, (): void => {
        beforeEach((): void => {
          isCapitalized = false;
        });

        it(`should return a date and humanized to an hour`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`an hour ago`);
        });
      });
    });

    describe(`when the given date is a date as two hours`, (): void => {
      beforeEach((): void => {
        date = moment().subtract(2, `hour`).format();
      });

      it(`should return a date capitalized and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = service.fromNow(date);

        expect(result).toStrictEqual(`2 hours ago`);
      });

      describe(`when the given capitalized state is true`, (): void => {
        beforeEach((): void => {
          isCapitalized = true;
        });

        it(`should return a date capitalized and humanized to two hours`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`2 hours ago`);
        });
      });

      describe(`when the given capitalized state is false`, (): void => {
        beforeEach((): void => {
          isCapitalized = false;
        });

        it(`should return a date and humanized to two hours`, (): void => {
          expect.assertions(1);

          const result = service.fromNow(date, isCapitalized);

          expect(result).toStrictEqual(`2 hours ago`);
        });
      });
    });
  });
});
