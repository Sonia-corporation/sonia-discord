import { getEveryHourScheduleRule } from "./get-every-hour-schedule-rule";

describe(`getEveryHourScheduleRule()`, (): void => {
  it(`should return the schedule for every hour`, (): void => {
    expect.assertions(1);

    const result = getEveryHourScheduleRule();

    expect(result).toStrictEqual(`0 * * * *`);
  });
});
