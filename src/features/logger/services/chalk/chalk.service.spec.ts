import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { CHALK_INSTANCE } from "../../constants/chalk/chalk-instance";
import { ChalkService } from "./chalk.service";

describe(`ChalkService`, (): void => {
  let service: ChalkService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Chalk service`, (): void => {
      expect.assertions(1);

      service = ChalkService.getInstance();

      expect(service).toStrictEqual(expect.any(ChalkService));
    });

    it(`should return the created Chalk service`, (): void => {
      expect.assertions(1);

      const result = ChalkService.getInstance();

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

    it(`should notify the Chalk service creation`, (): void => {
      expect.assertions(2);

      service = new ChalkService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.CHALK_SERVICE
      );
    });
  });

  describe(`success()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-success"`, (): void => {
      beforeEach((): void => {
        message = `dummy-success`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.success(message);

        expect(result).toMatch(`dummy-success`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.success(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "success"`, (): void => {
      beforeEach((): void => {
        message = `success`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.success(message);

        expect(result).toMatch(`success`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.success(message);
        }).not.toThrow();
      });
    });
  });

  describe(`context()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-context"`, (): void => {
      beforeEach((): void => {
        message = `dummy-context`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.context(message);

        expect(result).toMatch(`dummy-context`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.context(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "context"`, (): void => {
      beforeEach((): void => {
        message = `context`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.context(message);

        expect(result).toMatch(`context`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.context(message);
        }).not.toThrow();
      });
    });
  });

  describe(`value()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-value"`, (): void => {
      beforeEach((): void => {
        message = `dummy-value`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.value(message);

        expect(result).toMatch(`dummy-value`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.value(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "value"`, (): void => {
      beforeEach((): void => {
        message = `value`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.value(message);

        expect(result).toMatch(`value`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.value(message);
        }).not.toThrow();
      });
    });
  });

  describe(`hint()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-hint"`, (): void => {
      beforeEach((): void => {
        message = `dummy-hint`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.hint(message);

        expect(result).toMatch(`dummy-hint`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.hint(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "hint"`, (): void => {
      beforeEach((): void => {
        message = `hint`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.hint(message);

        expect(result).toMatch(`hint`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.hint(message);
        }).not.toThrow();
      });
    });
  });

  describe(`error()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-error"`, (): void => {
      beforeEach((): void => {
        message = `dummy-error`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.error(message);

        expect(result).toMatch(`dummy-error`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.error(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "error"`, (): void => {
      beforeEach((): void => {
        message = `error`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.error(message);

        expect(result).toMatch(`error`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.error(message);
        }).not.toThrow();
      });
    });
  });

  describe(`warning()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-warning"`, (): void => {
      beforeEach((): void => {
        message = `dummy-warning`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.warning(message);

        expect(result).toMatch(`dummy-warning`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.warning(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "warning"`, (): void => {
      beforeEach((): void => {
        message = `warning`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.warning(message);

        expect(result).toMatch(`warning`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.warning(message);
        }).not.toThrow();
      });
    });
  });

  describe(`text()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-text"`, (): void => {
      beforeEach((): void => {
        message = `dummy-text`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.text(message);

        expect(result).toMatch(`dummy-text`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.text(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "text"`, (): void => {
      beforeEach((): void => {
        message = `text`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.text(message);

        expect(result).toMatch(`text`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.text(message);
        }).not.toThrow();
      });
    });
  });

  describe(`log()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-log"`, (): void => {
      beforeEach((): void => {
        message = `dummy-log`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.log(message);

        expect(result).toMatch(`dummy-log`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.log(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "log"`, (): void => {
      beforeEach((): void => {
        message = `log`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.log(message);

        expect(result).toMatch(`log`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.log(message);
        }).not.toThrow();
      });
    });
  });

  describe(`debug()`, (): void => {
    let message: string | unknown;

    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the given message is "dummy-debug"`, (): void => {
      beforeEach((): void => {
        message = `dummy-debug`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.debug(message);

        expect(result).toMatch(`dummy-debug`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.debug(message);
        }).not.toThrow();
      });
    });

    describe(`when the given message is "debug"`, (): void => {
      beforeEach((): void => {
        message = `debug`;
      });

      it(`should return the given message`, (): void => {
        expect.assertions(1);

        const result = service.debug(message);

        expect(result).toMatch(`debug`);
      });

      it(`should not throw error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          service.debug(message);
        }).not.toThrow();
      });
    });
  });

  describe(`getLevel()`, (): void => {
    beforeEach((): void => {
      service = new ChalkService();
    });

    describe(`when the chalk level is 0`, (): void => {
      beforeEach((): void => {
        CHALK_INSTANCE.level = 0;
      });

      it(`should return 0`, (): void => {
        expect.assertions(1);

        const result = service.getLevel();

        expect(result).toStrictEqual(0);
      });
    });

    describe(`when the chalk level is 1`, (): void => {
      beforeEach((): void => {
        CHALK_INSTANCE.level = 1;
      });

      it(`should return 1`, (): void => {
        expect.assertions(1);

        const result = service.getLevel();

        expect(result).toStrictEqual(1);
      });
    });

    describe(`when the chalk level is 2`, (): void => {
      beforeEach((): void => {
        CHALK_INSTANCE.level = 2;
      });

      it(`should return 2`, (): void => {
        expect.assertions(1);

        const result = service.getLevel();

        expect(result).toStrictEqual(2);
      });
    });

    describe(`when the chalk level is 3`, (): void => {
      beforeEach((): void => {
        CHALK_INSTANCE.level = 3;
      });

      it(`should return 3`, (): void => {
        expect.assertions(1);

        const result = service.getLevel();

        expect(result).toStrictEqual(3);
      });
    });
  });
});
