import { LOGGER_LOG_LEVEL } from './logger-log-level';

describe(`LOGGER_LOG_LEVEL`, (): void => {
  it(`should be 3`, (): void => {
    expect.assertions(1);

    expect(LOGGER_LOG_LEVEL).toStrictEqual(3);
  });
});
