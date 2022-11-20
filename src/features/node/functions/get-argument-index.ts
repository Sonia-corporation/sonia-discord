import _ from 'lodash';

export function getArgumentIndex(name: string): number {
  return _.findIndex(process.argv, (argument: string): boolean =>
    _.isEqual(_.toLower(argument), _.toLower(`--${name}`))
  );
}
