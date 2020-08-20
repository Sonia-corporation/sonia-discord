import { IAnyObject } from "../../types/any-object";
import { replaceInterpolation } from "./replace-interpolation";

describe(`replaceInterpolation()`, (): void => {
  let text: string;
  let replacement: IAnyObject;

  describe(`when the given text is empty`, (): void => {
    beforeEach((): void => {
      text = ``;
    });

    describe(`when the given replacement is empty`, (): void => {
      beforeEach((): void => {
        replacement = {};
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when the given replacement is an object to replace the userId`, (): void => {
      beforeEach((): void => {
        replacement = {
          userId: `dummy-user-id`,
        };
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(``);
      });
    });
  });

  describe(`when the given text is a text without interpolation`, (): void => {
    beforeEach((): void => {
      text = `this is a simple text without interpolation`;
    });

    describe(`when the given replacement is empty`, (): void => {
      beforeEach((): void => {
        replacement = {};
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text without interpolation`
        );
      });
    });

    describe(`when the given replacement is an object to replace the userId`, (): void => {
      beforeEach((): void => {
        replacement = {
          userId: `dummy-user-id`,
        };
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text without interpolation`
        );
      });
    });
  });

  describe(`when the given text is a text with an interpolation for a date`, (): void => {
    beforeEach((): void => {
      text = `this is a simple text with an interpolation for a {{ date }}`;
    });

    describe(`when the given replacement is empty`, (): void => {
      beforeEach((): void => {
        replacement = {};
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text with an interpolation for a {{ date }}`
        );
      });
    });

    describe(`when the given replacement is an object to replace the userId`, (): void => {
      beforeEach((): void => {
        replacement = {
          userId: `dummy-user-id`,
        };
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text with an interpolation for a {{ date }}`
        );
      });
    });
  });

  describe(`when the given text is a text with an interpolation for a userId`, (): void => {
    beforeEach((): void => {
      text = `this is a simple text with an interpolation for a {{ userId }}`;
    });

    describe(`when the given replacement is empty`, (): void => {
      beforeEach((): void => {
        replacement = {};
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text with an interpolation for a {{ userId }}`
        );
      });
    });

    describe(`when the given replacement is an object to replace the userId`, (): void => {
      beforeEach((): void => {
        replacement = {
          userId: `dummy-user-id`,
        };
      });

      it(`should return the text with the userId replaced with the replacement value`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text with an interpolation for a dummy-user-id`
        );
      });
    });
  });

  describe(`when the given text is a text with an interpolation for a userId without space`, (): void => {
    beforeEach((): void => {
      text = `this is a simple text with an interpolation for a {{userId}}`;
    });

    describe(`when the given replacement is empty`, (): void => {
      beforeEach((): void => {
        replacement = {};
      });

      it(`should return the text unchanged`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text with an interpolation for a {{userId}}`
        );
      });
    });

    describe(`when the given replacement is an object to replace the userId`, (): void => {
      beforeEach((): void => {
        replacement = {
          userId: `dummy-user-id`,
        };
      });

      it(`should return the text with the userId replaced with the replacement value`, (): void => {
        expect.assertions(1);

        const result = replaceInterpolation(text, replacement);

        expect(result).toStrictEqual(
          `this is a simple text with an interpolation for a dummy-user-id`
        );
      });
    });
  });
});
