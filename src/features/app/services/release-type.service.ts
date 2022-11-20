import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { getReleaseTypeBlockRegexp } from '../../../functions/formatters/get-release-type-block-regexp';
import { getReleaseTypeBlockRowsRegexp } from '../../../functions/formatters/get-release-type-block-rows-regexp';
import { AppConfigReleaseTypeEnum } from '../enums/app-config-release-type.enum';
import { ReleaseTypeBlockNameEnum } from '../enums/release-type-block-name.enum';
import { IReleaseTypeCounts } from '../interfaces/release-type-counts';
import _ from 'lodash';

const ZERO = 0;
const TWO = 2;

export class ReleaseTypeService extends AbstractService {
  private static _instance: ReleaseTypeService;

  public static getInstance(): ReleaseTypeService {
    if (_.isNil(ReleaseTypeService._instance)) {
      ReleaseTypeService._instance = new ReleaseTypeService();
    }

    return ReleaseTypeService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.APP_CONFIG_QUERY_SERVICE);
  }

  public getReleaseType(releaseNotes: string): AppConfigReleaseTypeEnum {
    const counts: IReleaseTypeCounts = this._getCounts(releaseNotes);

    if (this._hasMultipleCounterSet(counts)) {
      return AppConfigReleaseTypeEnum.MIXED;
    }

    if (_.gt(counts.bugFixes, ZERO)) {
      return AppConfigReleaseTypeEnum.BUG_FIXES;
    } else if (_.gt(counts.features, ZERO)) {
      return AppConfigReleaseTypeEnum.FEATURES;
    } else if (_.gt(counts.performanceImprovements, ZERO)) {
      return AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS;
    }

    return AppConfigReleaseTypeEnum.UNKNOWN;
  }

  private _getBugFixesCount(releaseNotes: string): number {
    return this._getCount(releaseNotes, ReleaseTypeBlockNameEnum.BUG_FIXES);
  }

  private _getFeaturesCount(releaseNotes: string): number {
    return this._getCount(releaseNotes, ReleaseTypeBlockNameEnum.FEATURES);
  }

  private _getPerformanceImprovementsCount(releaseNotes: string): number {
    return this._getCount(releaseNotes, ReleaseTypeBlockNameEnum.PERFORMANCE_IMPROVEMENTS);
  }

  private _getCounts(releaseNotes: string): IReleaseTypeCounts {
    return {
      bugFixes: this._getBugFixesCount(releaseNotes),
      features: this._getFeaturesCount(releaseNotes),
      performanceImprovements: this._getPerformanceImprovementsCount(releaseNotes),
    };
  }

  private _hasMultipleCounterSet(counts: IReleaseTypeCounts): boolean {
    return _.gte(_.size(_.filter(counts, (count: number): boolean => _.gt(count, ZERO))), TWO);
  }

  private _extractBlock(releaseNotes: string, blockName: ReleaseTypeBlockNameEnum): string | undefined {
    return _.head(getReleaseTypeBlockRegexp(blockName).exec(releaseNotes));
  }

  private _countBlockRows(block: string): number {
    const blockWithRows: string | undefined = _.head(getReleaseTypeBlockRowsRegexp().exec(block));

    if (_.isNil(blockWithRows)) {
      return ZERO;
    }

    return _.size(_.split(blockWithRows, `\n`));
  }

  private _getCount(releaseNotes: string, blockName: ReleaseTypeBlockNameEnum): number {
    const block: string | undefined = this._extractBlock(releaseNotes, blockName);

    if (_.isNil(block)) {
      return ZERO;
    }

    return this._countBlockRows(block);
  }
}
