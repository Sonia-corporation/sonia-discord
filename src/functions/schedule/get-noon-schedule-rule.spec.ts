import { getNoonScheduleRule } from "./get-noon-schedule-rule";

describe(`getNoonScheduleRule()`, (): void => {
  it(`should return the schedule for every hour`, (): void => {
    expect.assertions(1);

    const result = getNoonScheduleRule();

    expect(result).toStrictEqual(`0 12 * * *`);
  });
});
