import { config, DotenvConfigOutput } from "dotenv";
import _ from "lodash";
import { CoreService } from "./features/core/services/core.service";
import { InitService } from "./features/init/services/init.service";

console.debug(`Node env: ${process.env.NODE_ENV}`);

if (_.isEqual(process.env.NODE_ENV, `development`)) {
  console.debug(`Loading the node environment...`);

  const dotenvConfigOutput: DotenvConfigOutput = config();

  if (!_.isNil(dotenvConfigOutput.error)) {
    console.error(`Failed to load the node environment`);
    console.error(dotenvConfigOutput.error);
  } else {
    console.debug(`Node environment successfully loaded`);
  }
} else {
  console.debug(`Skip the loading of the node environment`);
}

CoreService.getInstance().init();
InitService.getInstance().init();
