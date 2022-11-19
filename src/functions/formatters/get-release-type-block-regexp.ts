import { ReleaseTypeBlockNameEnum } from '../../features/app/enums/release-type-block-name.enum';
import xregexp from 'xregexp';

/**
 * @description
 * Match a release note group (title) plus all the notes related to it
 * Useful to extract from all the release notes a specific group
 * @param {ReleaseTypeBlockNameEnum} blockName The name of the block that should match
 * @returns {RegExp} The regexp to use
 */
export function getReleaseTypeBlockRegexp(blockName: ReleaseTypeBlockNameEnum): RegExp {
  return xregexp(`(\\*\\*__${blockName}:__)(.|\n)*(?=\\*\\*__|$)`, `gim`);
}
