import { DiscordSoniaEmotionalStateEnum } from './discord-sonia-emotional-state.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordSoniaEmotionalStateEnum`, (): void => {
  it(`should have 34 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordSoniaEmotionalStateEnum)).toBe(34);
  });

  it(`should have a member "AGITATED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.AGITATED).toBe(`agitated`);
  });

  it(`should have a member "ANGRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.ANGRY).toBe(`angry`);
  });

  it(`should have a member "ANNOYED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.ANNOYED).toBe(`annoyed`);
  });

  it(`should have a member "ANXIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.ANXIOUS).toBe(`anxious`);
  });

  it(`should have a member "BORED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.BORED).toBe(`bored`);
  });

  it(`should have a member "COMFORTABLE"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.COMFORTABLE).toBe(`comfortable`);
  });

  it(`should have a member "CONCERNED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.CONCERNED).toBe(`concerned`);
  });

  it(`should have a member "CRAZY"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.CRAZY).toBe(`crazy`);
  });

  it(`should have a member "CYNIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.CYNIC).toBe(`cynic`);
  });

  it(`should have a member "DARK"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.DARK).toBe(`dark`);
  });

  it(`should have a member "DELIRIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.DELIRIOUS).toBe(`delirious`);
  });

  it(`should have a member "DEPRESSED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.DEPRESSED).toBe(`depressed`);
  });

  it(`should have a member "DEVASTATED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.DEVASTATED).toBe(`devastated`);
  });

  it(`should have a member "ENIGMATIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.ENIGMATIC).toBe(`enigmatic`);
  });

  it(`should have a member "ENLIGHTENED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.ENLIGHTENED).toBe(`enlightened`);
  });

  it(`should have a member "EUPHORIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.EUPHORIC).toBe(`euphoric`);
  });

  it(`should have a member "EXCITED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.EXCITED).toBe(`excited`);
  });

  it(`should have a member "EXHAUSTED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.EXHAUSTED).toBe(`exhausted`);
  });

  it(`should have a member "GOOFY"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.GOOFY).toBe(`goofy`);
  });

  it(`should have a member "HOSTILE"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.HOSTILE).toBe(`hostile`);
  });

  it(`should have a member "MELANCHOLIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.MELANCHOLIC).toBe(`melancholic`);
  });

  it(`should have a member "MISERABLE"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.MISERABLE).toBe(`miserable`);
  });

  it(`should have a member "NERVOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.NERVOUS).toBe(`nervous`);
  });

  it(`should have a member "RATIONAL"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.RATIONAL).toBe(`rational`);
  });

  it(`should have a member "REBELLIOUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.REBELLIOUS).toBe(`rebellious`);
  });

  it(`should have a member "SENSITIVE"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.SENSITIVE).toBe(`sensitive`);
  });

  it(`should have a member "SEXY"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.SEXY).toBe(`sexy`);
  });

  it(`should have a member "SUBMISSIVE"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.SUBMISSIVE).toBe(`submissive`);
  });

  it(`should have a member "SURPRISED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.SURPRISED).toBe(`surprised`);
  });

  it(`should have a member "TORMENTED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.TORMENTED).toBe(`tormented`);
  });

  it(`should have a member "TROUBLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.TROUBLED).toBe(`troubled`);
  });

  it(`should have a member "UNHAPPY"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.UNHAPPY).toBe(`unhappy`);
  });

  it(`should have a member "UPSET"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.UPSET).toBe(`upset`);
  });

  it(`should have a member "VENGEFUL"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaEmotionalStateEnum.VENGEFUL).toBe(`vengeful`);
  });
});
