import { AppProductionStateEnum } from './app-production-state.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`AppProductionStateEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(AppProductionStateEnum)).toBe(2);
  });

  it(`should have a member "DEVELOPMENT"`, (): void => {
    expect.assertions(1);

    expect(AppProductionStateEnum.DEVELOPMENT).toBe(`development`);
  });

  it(`should have a member "PRODUCTION"`, (): void => {
    expect.assertions(1);

    expect(AppProductionStateEnum.PRODUCTION).toBe(`production`);
  });
});
