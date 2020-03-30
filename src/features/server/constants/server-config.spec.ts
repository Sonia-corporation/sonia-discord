import { SERVER_CONFIG } from './server-config';

describe(`SERVER_CONFIG`, (): void => {
  it(`should have a port`, (): void => {
    expect.assertions(1);

    expect(SERVER_CONFIG.port).toStrictEqual(3001);
  });
});
