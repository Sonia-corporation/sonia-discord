import { AbstractService } from '../../../../classes/services/abstract.service';
import { Snowflake } from 'discord.js';

export abstract class FirebaseAbstractStoreService<TData> extends AbstractService {
  public abstract init(): void;

  public abstract addOrUpdateEntities(entities: TData[]): void;

  public abstract addEntities(entities: TData[]): void;

  public abstract removeAllEntities(): void;

  public abstract getEntity(id: Snowflake): TData | undefined;
}
