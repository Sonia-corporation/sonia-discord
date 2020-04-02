import { ServerConfigCoreService } from "./server-config-core-service";

jest.mock(`../../../config/services/config-service`);

describe(`ServerConfigCoreService`, (): void => {
  let service: ServerConfigCoreService;

  beforeEach((): void => {
    service = ServerConfigCoreService.getInstance();
  });

  it(`should have a port`, (): void => {
    expect.assertions(1);

    expect(service.port).toStrictEqual(3001);
  });
});
