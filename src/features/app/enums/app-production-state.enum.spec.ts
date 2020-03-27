import { AppProductionStateEnum } from './app-production-state.enum';

describe(`appProductionStateEnum`, (): void => {
  it(`should have a member "DEVELOPMENT"`, (): void => {
    expect.assertions(1);

    expect(AppProductionStateEnum.DEVELOPMENT).toStrictEqual(`development`);
  });

  it(`should have a member "PRODUCTION"`, (): void => {
    expect.assertions(1);

    expect(AppProductionStateEnum.PRODUCTION).toStrictEqual(`production`);
  });
});
