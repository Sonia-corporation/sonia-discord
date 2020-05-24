import { CHALK_LEVELS_HUMANIZED } from "./chalk-levels-humanized";

describe(`CHALK_LEVELS_HUMANIZED`, (): void => {
  it(`should return a list of levels humanized`, (): void => {
    expect.assertions(1);

    expect(CHALK_LEVELS_HUMANIZED).toStrictEqual([
      `All colors disabled`,
      `Basic 16 colors support`,
      `ANSI 256 colors support`,
      `Truecolor 16 million colors support`,
    ] as string[]);
  });
});
