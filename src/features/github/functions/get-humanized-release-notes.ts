import _ from 'lodash';

export function getHumanizedReleaseNotes(releaseNotes: Readonly<string>): string {
  let updatedReleaseNotes: string = _.clone(releaseNotes);

  // Remove the tag
  // Like "# [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0) (2020-03-24)\n\n\n" by ""
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /^.+?(\n\n\n)/mi, ``);

  // Change the h3
  // Like "* **logs:**"
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(###\s.+?\n)/gmi, (h3: Readonly<string>): string => {
    let updatedH3: string = _.clone(h3);

    // Replace the "### " by "**__"
    updatedH3 = _.replace(updatedH3, /(###\s)/i, `**__`);

    // Replace "\n" by "__**"
    updatedH3 = _.replace(updatedH3, /(\n)/i, `__**`);

    return updatedH3;
  });

  // Change the title bullet
  // Like "* **logs:**"
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(\*\s\*\*.+?\*\*)/gmi, (titleBullet: Readonly<string>): string => {
    let updatedTitleBullet: string = _.clone(titleBullet);

    // Replace the "* " by ""
    updatedTitleBullet = _.replace(updatedTitleBullet, /(\*\s)/i, ``);

    return updatedTitleBullet;
  });

  // Remove the links
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(\(.+?\)|\[.+?]|\))/gmi, ``);

  // Remove the trailing carets
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(\n|\s)+$/gmi, ``);

  // Remove sibling bold syntax
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(\*\*\n\*\*)/gmi, `\n`);

  // Remove empty lines
  updatedReleaseNotes = _.replace(updatedReleaseNotes, /(\n){2,}/gmi, `\n`);

  return updatedReleaseNotes;
}
