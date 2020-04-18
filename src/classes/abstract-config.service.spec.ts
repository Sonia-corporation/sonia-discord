import _ from "lodash";
import { PartialNested } from "../types/partial-nested";
import { AbstractConfigService } from "./abstract-config.service";

interface IDummy {
  key1: string;
}

class DummyService extends AbstractConfigService<IDummy> {
  private static _instance: DummyService;

  public static getInstance(
    config?: Readonly<PartialNested<IDummy>>
  ): DummyService {
    if (_.isNil(DummyService._instance)) {
      DummyService._instance = new DummyService(config);
    }

    return DummyService._instance;
  }

  protected readonly _className = `DummyService`;

  protected constructor(config?: Readonly<PartialNested<IDummy>>) {
    super(config);
  }

  public updateConfig(_config?: Readonly<PartialNested<IDummy>>): void {
    // Avoid lint error :)
  }
}

describe(`AbstractConfigService`, (): void => {
  let service: DummyService;

  beforeEach((): void => {
    service = DummyService.getInstance();
  });

  describe(`preUpdateConfig()`, (): void => {
    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = service.preUpdateConfig();

      expect(result).toBeUndefined();
    });
  });

  describe(`updateConfig()`, (): void => {
    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = service.updateConfig();

      expect(result).toBeUndefined();
    });
  });

  describe(`postUpdateConfig()`, (): void => {
    it(`should return undefined`, (): void => {
      expect.assertions(1);

      const result = service.postUpdateConfig();

      expect(result).toBeUndefined();
    });
  });
});
