import xregexp from "xregexp";

/**
 * @description
 * Required to handle groups and unicode
 */
xregexp.install({
  astral: true,
  namespacing: true,
});
