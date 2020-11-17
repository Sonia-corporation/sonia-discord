import { LOGGER_WARNING_LEVEL } from './logger-warning-level';

describe(`LOGGER_WARNING_LEVEL`, (): void => {
  it(`should be 1`, (): void => {
    expect.assertions(1);

    expect(LOGGER_WARNING_LEVEL).toStrictEqual(1);
  });
});
