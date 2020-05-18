import _ from "lodash";
import { Job, scheduleJob } from "node-schedule";
import { getNoonScheduleRule } from "../../../functions/schedule/get-noon-schedule-rule";
import * as FromNowModule from "../../time/functions/from-now";
import { getNextJobDateHumanized } from "./get-next-job-date-humanized";

describe(`getNextJobDateHumanized()`, (): void => {
  let job: Job;

  let fromNowSpy: jest.SpyInstance;

  beforeEach((): void => {
    fromNowSpy = jest
      .spyOn(FromNowModule, `fromNow`)
      .mockReturnValue(`humanized-date`);
  });

  describe(`when the given job is at noon`, (): void => {
    beforeEach((): void => {
      job = scheduleJob(getNoonScheduleRule(), _.noop);
    });

    it(`should convert the given job date from now`, (): void => {
      expect.assertions(2);

      getNextJobDateHumanized(job);

      expect(fromNowSpy).toHaveBeenCalledTimes(1);
      expect(fromNowSpy).toHaveBeenCalledWith(expect.any(String), false);
    });

    it(`should return an humanized date`, (): void => {
      expect.assertions(1);

      const result = getNextJobDateHumanized(job);

      expect(result).toStrictEqual(`humanized-date`);
    });
  });
});
