import { QUOTE_API_URL } from './quote-api-url';

describe(`QUOTE_API_URL`, (): void => {
  it(`should contains the url to the Quote API`, (): void => {
    expect.assertions(1);

    expect(QUOTE_API_URL).toBe(`https://favqs.com/api/`);
  });
});
