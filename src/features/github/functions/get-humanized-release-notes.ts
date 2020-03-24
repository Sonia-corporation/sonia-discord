import _ from 'lodash';

export function getHumanizedReleaseNotes(notes: Readonly<string>): string {
  let updatedNotes: string = _.clone(notes);

  // Remove the #
  updatedNotes = _.replace(updatedNotes, /(#\\s)/mi, ``);

  // Change the main title typography
  updatedNotes = _.replace(updatedNotes, /(###\\s.*?\\n)/gmi, (note: Readonly<string>): string => {
    let updatedNote: string = _.clone(note);

    // Replace the "### " by "*"
    updatedNote = _.replace(updatedNote, /(###\\s)/gmi, `*`);

    // Replace "\n" by "*"
    updatedNote = _.replace(updatedNote, /(\\n)/gmi, `*`);

    return updatedNote;
  });

  // Remove markdown and links
  updatedNotes = _.replace(updatedNotes, /(\*\s\*\*|\\n|\*\*|\(.*?\)|\[.*?]|\))/gmi, ``);

  console.log(updatedNotes);

  return updatedNotes;
}
