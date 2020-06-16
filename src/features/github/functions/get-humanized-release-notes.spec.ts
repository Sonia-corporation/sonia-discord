import { getHumanizedReleaseNotes } from "./get-humanized-release-notes";

describe(`getHumanizedReleaseNotes()`, (): void => {
  let releaseNotes: string;

  describe(`when the given release notes is a simple string`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy notes`;
    });

    it(`should not change the given release notes`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy notes`);
    });
  });

  describe(`when the given release notes contain a start tag`, (): void => {
    beforeEach((): void => {
      releaseNotes = `# [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0) (2020-03-24)\n\n\n`;
    });

    it(`should remove the tag`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(``);
    });
  });

  describe(`when the given release notes contain a markdown h3`, (): void => {
    beforeEach((): void => {
      releaseNotes = `### Bug Fixes\n`;
    });

    it(`should reformat the h3 to a bold underline Discord value`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`**__Bug Fixes:__**`);
    });
  });

  describe(`when the given release notes contain a markdown h3 with emoji`, (): void => {
    beforeEach((): void => {
      releaseNotes = `### :bug: Bug Fixes\n`;
    });

    it(`should reformat the h3 to a bold underline Discord value and remove the emoji`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`**__Bug Fixes:__**`);
    });
  });

  describe(`when the given release notes contain a markdown bold value`, (): void => {
    beforeEach((): void => {
      releaseNotes = `* **logs:**`;
    });

    it(`should reformat the value to use a compatible Discord bold format`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`**logs:**`);
    });
  });

  describe(`when the given release notes contain a markdown link`, (): void => {
    beforeEach((): void => {
      releaseNotes = `[1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0)`;
    });

    it(`should remove the link`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(``);
    });
  });

  describe(`when the given release notes contain a markdown link with a text`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy text [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0)`;
    });

    it(`should remove the link`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy text`);
    });
  });

  describe(`when the given release notes contain a markdown link with a text and fixes annotation at the end`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy text fixes #789 [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0)`;
    });

    it(`should remove the link`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy text`);
    });
  });

  describe(`when the given release notes contain a markdown link with a text and fixes annotation in the middle`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy text fixes #789 for good [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0)`;
    });

    it(`should remove the link`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy text for good`);
    });
  });

  describe(`when the given release notes contain trailing carets`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy text \n\n\n\n`;
    });

    it(`should remove the trailing carets`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy text`);
    });
  });

  describe(`when the given release notes contain a fixes annotation at the end`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy text fixes #789`;
    });

    it(`should remove the fixes annotation`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy text`);
    });
  });

  describe(`when the given release notes contain a fixes annotation in the middle`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy text fixes #789 for good`;
    });

    it(`should remove the fixes annotation`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy text for good`);
    });
  });

  describe(`when the given release notes contain a tag, two h3, multiple bold values and links`, (): void => {
    beforeEach((): void => {
      releaseNotes = `# [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0) (2020-03-24)\n\n\n### Bug Fixes\n\n* **labeler:** fix build error ([8e124bf](https://github.com/Sonia-corporation/il-est-midi-discord/commit/8e124bfc660d77a27a84ae9c0a7cf34873bccced))\n* **environment:** fix type error due to --fix tslint option failing ([bf80634](https://github.com/Sonia-corporation/il-est-midi-discord/commit/bf80634df464883aecd6569f3dc869da01ebe104))\n\n\n### Features\n\n* **command-version:** add a footer ([7b4953e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7b4953e17d882569d237c8eaf919e8823af0314e))\n* **app-total-release-count:** add axios xhr call to get the total tags from the github api ([a12b613](https://github.com/Sonia-corporation/il-est-midi-discord/commit/a12b6138eea0f05b08648aa163be54e7e81b27ef))\n* **logs:** add more logs for the messages ([14fbe9b](https://github.com/Sonia-corporation/il-est-midi-discord/commit/14fbe9b193d7ee35e0f96048956f731eaf7a306c))\n* **github:** add new github config service ([106ba1c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/106ba1c1ac578c404c3b0eb9e337b229c5c47d3a))\n* **command-version:** add the real number of release in the footer ([c2af362](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c2af362b84ec82f9faa403c30bbd616def96ad58))\n* **init-service:** used the github config service to get the personal access token ([7d9653c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7d9653cc440acdcec2251d3a75da489fcc191692))\n\n\n\n`;
    });

    it(`should format the given release notes for Discord`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(
        `**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Features:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`
      );
    });
  });

  describe(`when the given release notes contain a tag, two h3 with emojis, multiple bold values and links`, (): void => {
    beforeEach((): void => {
      releaseNotes = `# [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0) (2020-03-24)\n\n\n### :bug: Bug Fixes\n\n* **labeler:** fix build error ([8e124bf](https://github.com/Sonia-corporation/il-est-midi-discord/commit/8e124bfc660d77a27a84ae9c0a7cf34873bccced))\n* **environment:** fix type error due to --fix tslint option failing ([bf80634](https://github.com/Sonia-corporation/il-est-midi-discord/commit/bf80634df464883aecd6569f3dc869da01ebe104))\n\n\n### :rocket: Features\n\n* **command-version:** add a footer ([7b4953e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7b4953e17d882569d237c8eaf919e8823af0314e))\n* **app-total-release-count:** add axios xhr call to get the total tags from the github api ([a12b613](https://github.com/Sonia-corporation/il-est-midi-discord/commit/a12b6138eea0f05b08648aa163be54e7e81b27ef))\n* **logs:** add more logs for the messages ([14fbe9b](https://github.com/Sonia-corporation/il-est-midi-discord/commit/14fbe9b193d7ee35e0f96048956f731eaf7a306c))\n* **github:** add new github config service ([106ba1c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/106ba1c1ac578c404c3b0eb9e337b229c5c47d3a))\n* **command-version:** add the real number of release in the footer ([c2af362](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c2af362b84ec82f9faa403c30bbd616def96ad58))\n* **init-service:** used the github config service to get the personal access token ([7d9653c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7d9653cc440acdcec2251d3a75da489fcc191692))\n\n\n\n`;
    });

    it(`should format the given release notes for Discord`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(
        `**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Features:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`
      );
    });
  });

  describe(`when the given release notes contain a tag, two h3 with fixes, multiple bold values and links`, (): void => {
    beforeEach((): void => {
      releaseNotes = `# [1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0) (2020-03-24)\n\n\n### Bug Fixes\n\n* **labeler:** fix build fixes #789 error ([8e124bf](https://github.com/Sonia-corporation/il-est-midi-discord/commit/8e124bfc660d77a27a84ae9c0a7cf34873bccced))\n* **environment:** fix type error due to --fix tslint option failing fixes #123 ([bf80634](https://github.com/Sonia-corporation/il-est-midi-discord/commit/bf80634df464883aecd6569f3dc869da01ebe104))\n\n\n### Features\n\n* **command-version:** add a footer ([7b4953e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7b4953e17d882569d237c8eaf919e8823af0314e))\n* **app-total-release-count:** add axios xhr call to get the total tags from the github api ([a12b613](https://github.com/Sonia-corporation/il-est-midi-discord/commit/a12b6138eea0f05b08648aa163be54e7e81b27ef))\n* **logs:** add more logs for the messages ([14fbe9b](https://github.com/Sonia-corporation/il-est-midi-discord/commit/14fbe9b193d7ee35e0f96048956f731eaf7a306c))\n* **github:** add new github config service ([106ba1c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/106ba1c1ac578c404c3b0eb9e337b229c5c47d3a))\n* **command-version:** add the real number of release in the footer ([c2af362](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c2af362b84ec82f9faa403c30bbd616def96ad58))\n* **init-service:** used the github config service to get the personal access token ([7d9653c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7d9653cc440acdcec2251d3a75da489fcc191692))\n\n\n\n`;
    });

    it(`should format the given release notes for Discord and remove the fixes`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(
        `**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Features:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`
      );
    });
  });
});
