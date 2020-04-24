import { getEveryMinuteScheduleRule } from "./get-every-minute-schedule-rule";

describe(`getEveryMinuteScheduleRule()`, (): void => {
  it(`should return the schedule for every hour`, (): void => {
    expect.assertions(1);

    const result = getEveryMinuteScheduleRule();

    expect(result).toStrictEqual(`* * * * *`);
  });
});
