import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { FirebaseUpdateCoreService } from "./firebase-update-core.service";

jest.mock(`../../logger/services/chalk/chalk.service`);

interface IDummy {
  id: string;
}

class DummyService extends FirebaseUpdateCoreService<
  IDummy,
  IDummy,
  IDummy,
  IDummy
> {
  public constructor() {
    super(ServiceNameEnum.APP_CONFIG_CORE_SERVICE);
  }

  public upgrade(entity: IDummy): IDummy {
    return entity;
  }

  public create(_createEntity: IDummy | undefined): IDummy {
    return {
      id: `dummy-id`,
    };
  }

  public isUpToDate(_entity: IDummy): _entity is IDummy {
    return true;
  }
}

describe(`FirebaseUpdateCoreService`, (): void => {
  let service: DummyService;

  beforeEach((): void => {
    service = new DummyService();
  });

  describe(`isValid()`, (): void => {
    let entity: IDummy | undefined;

    describe(`when the given entity is undefined`, (): void => {
      beforeEach((): void => {
        entity = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(entity);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given entity is a valid`, (): void => {
      beforeEach((): void => {
        entity = createMock<IDummy>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(entity);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let entity: IDummy | undefined;

    describe(`when the given entity is undefined`, (): void => {
      beforeEach((): void => {
        entity = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(entity);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given entity is valid`, (): void => {
      beforeEach((): void => {
        entity = createMock<IDummy>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(entity);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`getUpToDate()`, (): void => {
    let entity: IDummy | undefined;
    let createEntity: IDummy | undefined;

    beforeEach((): void => {
      createEntity = undefined;
    });

    describe(`when the given entity is undefined`, (): void => {
      beforeEach((): void => {
        entity = undefined;
      });

      it(`should return a newly created entity`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(entity, createEntity);

        expect(result.id).toStrictEqual(`dummy-id`);
      });
    });

    describe(`when the given IDummy is valid`, (): void => {
      beforeEach((): void => {
        entity = createMock<IDummy>();
      });

      it(`should return the given entity`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(entity, createEntity);

        expect(result).toStrictEqual(entity);
      });
    });
  });
});
