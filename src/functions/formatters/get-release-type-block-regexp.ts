import { ReleaseTypeBlockNameEnum } from '../../features/app/enums/release-type-block-name.enum';
import xregexp from 'xregexp';

/**
 * @param blockName
 */
export function getReleaseTypeBlockRegexp(blockName: Readonly<ReleaseTypeBlockNameEnum>): RegExp {
  return xregexp(`(\\*\\*__${blockName}:__)(.|\n)*(?=\\*\\*__|$)`, `gim`);
}
