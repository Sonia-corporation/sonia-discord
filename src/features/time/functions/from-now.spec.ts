import { fromNow } from './from-now';
import moment, { MomentInput } from 'moment-timezone';

describe(`fromNow()`, (): void => {
  let date: MomentInput;
  let isCapitalized: boolean;

  describe(`when the given date is an empty string`, (): void => {
    beforeEach((): void => {
      date = ``;
    });

    it(`should return "Invalid date"`, (): void => {
      expect.assertions(1);

      const result = fromNow(date);

      expect(result).toBe(`Invalid date`);
    });

    describe(`when the given capitalized state is true`, (): void => {
      beforeEach((): void => {
        isCapitalized = true;
      });

      it(`should return "Invalid date"`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`Invalid date`);
      });
    });

    describe(`when the given capitalized state is false`, (): void => {
      beforeEach((): void => {
        isCapitalized = false;
      });

      it(`should return "Invalid date"`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`Invalid date`);
      });
    });
  });

  describe(`when the given date is "unknown"`, (): void => {
    beforeEach((): void => {
      date = `unknown`;
    });

    it(`should return "Invalid date"`, (): void => {
      expect.assertions(1);

      const result = fromNow(date);

      expect(result).toBe(`Invalid date`);
    });

    describe(`when the given capitalized state is true`, (): void => {
      beforeEach((): void => {
        isCapitalized = true;
      });

      it(`should return "Invalid date"`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`Invalid date`);
      });
    });

    describe(`when the given capitalized state is false`, (): void => {
      beforeEach((): void => {
        isCapitalized = false;
      });

      it(`should return "Invalid date"`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`Invalid date`);
      });
    });
  });

  describe(`when the given date is a date as now`, (): void => {
    beforeEach((): void => {
      date = moment().format();
    });

    it(`should return a date capitalized and humanized to a few seconds`, (): void => {
      expect.assertions(1);

      const result = fromNow(date);

      expect(result).toBe(`A few seconds ago`);
    });

    describe(`when the given capitalized state is true`, (): void => {
      beforeEach((): void => {
        isCapitalized = true;
      });

      it(`should return a date capitalized and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`A few seconds ago`);
      });
    });

    describe(`when the given capitalized state is false`, (): void => {
      beforeEach((): void => {
        isCapitalized = false;
      });

      it(`should return a date and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`a few seconds ago`);
      });
    });
  });

  describe(`when the given date is a date as one hour`, (): void => {
    beforeEach((): void => {
      date = moment().subtract(1, `hour`).format();
    });

    it(`should return a date capitalized and humanized to an hour`, (): void => {
      expect.assertions(1);

      const result = fromNow(date);

      expect(result).toBe(`An hour ago`);
    });

    describe(`when the given capitalized state is true`, (): void => {
      beforeEach((): void => {
        isCapitalized = true;
      });

      it(`should return a date capitalized and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`An hour ago`);
      });
    });

    describe(`when the given capitalized state is false`, (): void => {
      beforeEach((): void => {
        isCapitalized = false;
      });

      it(`should return a date and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`an hour ago`);
      });
    });
  });

  describe(`when the given date is a date as two hours`, (): void => {
    beforeEach((): void => {
      date = moment().subtract(2, `hour`).format();
    });

    it(`should return a date capitalized and humanized to two hours`, (): void => {
      expect.assertions(1);

      const result = fromNow(date);

      expect(result).toBe(`2 hours ago`);
    });

    describe(`when the given capitalized state is true`, (): void => {
      beforeEach((): void => {
        isCapitalized = true;
      });

      it(`should return a date capitalized and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`2 hours ago`);
      });
    });

    describe(`when the given capitalized state is false`, (): void => {
      beforeEach((): void => {
        isCapitalized = false;
      });

      it(`should return a date and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = fromNow(date, isCapitalized);

        expect(result).toBe(`2 hours ago`);
      });
    });
  });
});
