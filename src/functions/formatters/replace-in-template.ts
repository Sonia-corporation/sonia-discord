import { IObject } from '../../types/object';
import _ from 'lodash';

/**
 * @description
 * Replace the tags like: "{{ x }}" in the given text with the ones coming from the given params.
 * @param   {string}  text   The text with some tags.
 * @param   {IObject} params The params used to replace the tags.
 * @returns {string}         The text with the tags replaced by the params.
 */
export function replaceInTemplate(text: string, params: IObject): string {
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  return _.template(text)(params);
}
