import { isQuoteErrorApi } from './is-quote-error-api';
import { IObject } from '../../../types/object';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';

describe(`isQuoteErrorApi()`, (): void => {
  let quoteErrorApi: IObject | IQuoteErrorApi;

  describe(`when the given value is an empty object`, (): void => {
    beforeEach((): void => {
      quoteErrorApi = {};
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isQuoteErrorApi(quoteErrorApi);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is an object without a key "error_code"`, (): void => {
    beforeEach((): void => {
      quoteErrorApi = {
        key: `value`,
      };
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isQuoteErrorApi(quoteErrorApi);

      expect(result).toBeFalse();
    });
  });

  describe(`when the given value is an object with a key "error_code"`, (): void => {
    beforeEach((): void => {
      quoteErrorApi = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        error_code: `value`,
      };
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isQuoteErrorApi(quoteErrorApi);

      expect(result).toBeTrue();
    });
  });
});
