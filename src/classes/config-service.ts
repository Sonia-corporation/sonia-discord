import { ChalkService } from '../features/logger/services/chalk-service';
import { LoggerService } from '../features/logger/services/logger-service';
import { PartialNested } from '../types/partial-nested';

export abstract class ConfigService<C> {
  protected readonly _loggerService = LoggerService.getInstance();
  protected readonly _chalkService = ChalkService.getInstance();
  protected readonly abstract _className: string;

  protected constructor(config?: Readonly<PartialNested<C>>) {
    this.init();
    this.updateConfig(config);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected init(): void {
  }

  protected abstract updateConfig(config?: Readonly<PartialNested<C>>): void;
}
