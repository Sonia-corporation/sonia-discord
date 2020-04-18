import { ProfileConfigCoreService } from "./profile-config-core.service";

describe(`ProfileConfigCoreService`, (): void => {
  let service: ProfileConfigCoreService;

  beforeEach((): void => {
    service = ProfileConfigCoreService.getInstance();
  });

  it(`should not have a nickname`, (): void => {
    expect.assertions(1);

    expect(service.nickname).toBeNull();
  });
});
