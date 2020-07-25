import { FirebaseAppEnum } from "./firebase-app.enum";

describe(`FirebaseAppEnum`, (): void => {
  it(`should have a member "SONIA_IL_EST_MIDI_DISCORD"`, (): void => {
    expect.assertions(1);

    expect(FirebaseAppEnum.SONIA_IL_EST_MIDI_DISCORD).toStrictEqual(
      `sonia-il-est-midi-discord`
    );
  });
});
