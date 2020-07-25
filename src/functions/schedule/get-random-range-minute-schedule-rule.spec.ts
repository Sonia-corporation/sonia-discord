import { getRandomRangeMinuteScheduleRule } from "./get-random-range-minute-schedule-rule";

describe(`getRandomRangeMinuteScheduleRule()`, (): void => {
  let minimumInterval: number;
  let maximumInterval: number;

  beforeEach((): void => {
    minimumInterval = 5;
    maximumInterval = 30;
  });

  describe(`when the minimum interval is -1`, (): void => {
    beforeEach((): void => {
      minimumInterval = -1;
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        getRandomRangeMinuteScheduleRule(minimumInterval, maximumInterval);
      }).toThrow(new Error(`Minimum interval should be greater or equal to 0`));
    });
  });

  describe(`when the minimum interval is 60`, (): void => {
    beforeEach((): void => {
      minimumInterval = 60;
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        getRandomRangeMinuteScheduleRule(minimumInterval, maximumInterval);
      }).toThrow(new Error(`Minimum interval should be lower than 60`));
    });
  });

  describe(`when the maximum interval is -1`, (): void => {
    beforeEach((): void => {
      maximumInterval = -1;
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        getRandomRangeMinuteScheduleRule(minimumInterval, maximumInterval);
      }).toThrow(new Error(`Maximum interval should be greater or equal to 0`));
    });
  });

  describe(`when the maximum interval is 60`, (): void => {
    beforeEach((): void => {
      maximumInterval = 60;
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        getRandomRangeMinuteScheduleRule(minimumInterval, maximumInterval);
      }).toThrow(new Error(`Maximum interval should be lower than 60`));
    });
  });

  describe(`when the minimum interval is 0`, (): void => {
    beforeEach((): void => {
      minimumInterval = 0;
    });

    describe(`when the maximum interval is 0`, (): void => {
      beforeEach((): void => {
        maximumInterval = 0;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          getRandomRangeMinuteScheduleRule(minimumInterval, maximumInterval);
        }).toThrow(
          new Error(`Maximum interval should be greater than minimum interval`)
        );
      });
    });

    describe(`when the maximum interval is 1`, (): void => {
      beforeEach((): void => {
        maximumInterval = 1;
      });

      it(`should return the schedule for each minute from 0 to 59`, (): void => {
        expect.assertions(1);

        const result = getRandomRangeMinuteScheduleRule(
          minimumInterval,
          maximumInterval
        );

        expect(result).toBeOneOf([
          `0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59 * * * *`,
          `1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59 * * * *`,
        ]);
      });
    });
  });
});
