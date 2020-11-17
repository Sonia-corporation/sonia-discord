import { LOGGER_DEBUG_LEVEL } from './logger-debug-level';

describe(`LOGGER_DEBUG_LEVEL`, (): void => {
  it(`should be 4`, (): void => {
    expect.assertions(1);

    expect(LOGGER_DEBUG_LEVEL).toStrictEqual(4);
  });
});
