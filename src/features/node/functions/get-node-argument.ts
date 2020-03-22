import _ from 'lodash';

export function getNodeArgument(name: Readonly<string>): unknown | null {
  if (!_.isNil(process) && !_.isNil(process.argv)) {
    const argumentIndex: number = _.findIndex(process.argv, (argument: Readonly<string>): boolean => {
      return _.isEqual(_.toLower(argument), _.toLower(`--${name}`));
    });

    if (_.isFinite(argumentIndex) && _.gte(argumentIndex, 0)) {
      const originArgumentValueIndex: number = _.add(argumentIndex, 1);

      if (_.lte(originArgumentValueIndex, _.subtract(_.size(process.argv), 1))) {
        return process.argv[ originArgumentValueIndex ];
      }
    }
  }

  return null;
}
