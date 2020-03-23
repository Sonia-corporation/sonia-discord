import appRootPath from 'app-root-path';
import fs from 'fs-extra';
import { IPackage } from '../../../interfaces/package';
import { AppConfigService } from '../../app/app-config-service';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';

export function configureAppFromPackage(): void {
  fs.readJson(`${appRootPath}/package.json`).then((data: Readonly<IPackage>): void => {
    AppConfigService.getInstance().updateVersion(data.version);
  }).catch((error: unknown): void => {
    LoggerService.getInstance().error(ChalkService.getInstance().text(`Failed to read the package file`));
    LoggerService.getInstance().error(ChalkService.getInstance().text(error));
  });
}
