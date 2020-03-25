import _ from 'lodash';

export function getHumanizedReleaseNotes(releaseNotes: Readonly<string>): string {
  let updatedReleaseNotes: string = _.clone(releaseNotes);

  // Remove the #
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(#\\s)/mi, ``);

  // Change the main title typography
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(###\\s.*?\\n)/gmi, (releaseNote: Readonly<string>): string => {
    let updatedReleaseNote: string = _.clone(releaseNote);

    // Replace the "### " by "*"
    updatedReleaseNote = _.replace(updatedReleaseNote, /(###\\s)/gmi, `*`);

    // Replace "\n" by "*"
    updatedReleaseNote = _.replace(updatedReleaseNote, /(\\n)/gmi, `*`);

    return updatedReleaseNote;
  });

  // Remove markdown and links
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(\*\s\*\*|\\n|\*\*|\(.*?\)|\[.*?]|\))/gmi, ``);

  return updatedReleaseNotes;
}
