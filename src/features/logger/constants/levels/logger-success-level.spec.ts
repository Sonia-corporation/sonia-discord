import { LOGGER_SUCCESS_LEVEL } from './logger-success-level';

describe(`LOGGER_SUCCESS_LEVEL`, (): void => {
  it(`should be 2`, (): void => {
    expect.assertions(1);

    expect(LOGGER_SUCCESS_LEVEL).toStrictEqual(2);
  });
});
