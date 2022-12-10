// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require(`lodash`);

global.createInstance = (className, data) => {
  const instance = Object.create(className);

  if (data) {
    _.assign(instance, data);
  }

  return instance;
};
