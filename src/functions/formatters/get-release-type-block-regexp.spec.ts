import { getReleaseTypeBlockRegexp } from './get-release-type-block-regexp';
import { ReleaseTypeBlockNameEnum } from '../../features/app/enums/release-type-block-name.enum';
import xregexp from 'xregexp';

describe(`getReleaseTypeBlockRegexp()`, (): void => {
  let blockName: ReleaseTypeBlockNameEnum;
  let text: string;

  describe(`when the given value is bug fixes`, (): void => {
    beforeEach((): void => {
      blockName = ReleaseTypeBlockNameEnum.BUG_FIXES;
    });

    it(`should return a regexp`, (): void => {
      expect.assertions(1);

      const result = getReleaseTypeBlockRegexp(blockName);

      expect(result).toStrictEqual(/(\*\*__Bug Fixes:__)(.|\n)*(?=\*\*__|$)/gim);
    });

    describe(`when tested with an empty text`, (): void => {
      beforeEach((): void => {
        text = ``;
      });

      it(`should not match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeFalse();
      });
    });

    describe(`when tested with a bug fixes block`, (): void => {
      beforeEach((): void => {
        text = `**__Bug Fixes:__\nlabeler:** fix build error`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });

    describe(`when tested with a bug fixes and a features block`, (): void => {
      beforeEach((): void => {
        text = `**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Features:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });

    describe(`when tested with a features and a bug fixes block`, (): void => {
      beforeEach((): void => {
        text = `**__Features:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token\n**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });
  });

  describe(`when the given value is features`, (): void => {
    beforeEach((): void => {
      blockName = ReleaseTypeBlockNameEnum.FEATURES;
    });

    it(`should return a regexp`, (): void => {
      expect.assertions(1);

      const result = getReleaseTypeBlockRegexp(blockName);

      expect(result).toStrictEqual(/(\*\*__Features:__)(.|\n)*(?=\*\*__|$)/gim);
    });

    describe(`when tested with an empty text`, (): void => {
      beforeEach((): void => {
        text = ``;
      });

      it(`should not match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeFalse();
      });
    });

    describe(`when tested with a features block`, (): void => {
      beforeEach((): void => {
        text = `**__Features:__\nlabeler:** fix build error`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });

    describe(`when tested with a features and a bug fixes block`, (): void => {
      beforeEach((): void => {
        text = `**__Features:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Bug Fixes:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });

    describe(`when tested with a bug fixes and a features block`, (): void => {
      beforeEach((): void => {
        text = `**__Bug Fixes:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token\n**__Features:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });
  });

  describe(`when the given value is performance improvements`, (): void => {
    beforeEach((): void => {
      blockName = ReleaseTypeBlockNameEnum.PERFORMANCE_IMPROVEMENTS;
    });

    it(`should return a regexp`, (): void => {
      expect.assertions(1);

      const result = getReleaseTypeBlockRegexp(blockName);

      expect(result).toStrictEqual(/(\*\*__Performance Improvements:__)(.|\n)*(?=\*\*__|$)/gim);
    });

    describe(`when tested with an empty text`, (): void => {
      beforeEach((): void => {
        text = ``;
      });

      it(`should not match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeFalse();
      });
    });

    describe(`when tested with a performance improvements block`, (): void => {
      beforeEach((): void => {
        text = `**__Performance Improvements:__\nlabeler:** fix build error`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });

    describe(`when tested with a performance improvements and a bug fixes block`, (): void => {
      beforeEach((): void => {
        text = `**__Performance Improvements:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Bug Fixes:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });

    describe(`when tested with a bug fixes and a performance improvements block`, (): void => {
      beforeEach((): void => {
        text = `**__Bug Fixes:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token\n**__Performance Improvements:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should match`, (): void => {
        expect.assertions(1);

        const result = getReleaseTypeBlockRegexp(blockName);

        expect(xregexp.test(text, result)).toBeTrue();
      });
    });
  });
});
