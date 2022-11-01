import { LOGGER_ERROR_LEVEL } from './logger-error-level';

describe(`LOGGER_ERROR_LEVEL`, (): void => {
  it(`should be 0`, (): void => {
    expect.assertions(1);

    expect(LOGGER_ERROR_LEVEL).toBe(0);
  });
});
