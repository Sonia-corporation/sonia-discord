import _ from "lodash";
import { AbstractService } from "../../../classes/services/abstract.service";

/**
 * @todo
 * Replace unknown types with real types like Object or IObject
 * Actually not possible due to https://github.com/microsoft/TypeScript/issues/15300#issuecomment-371353444
 */
export abstract class FirebaseUpdateCoreService<
  TEntity extends unknown,
  TFinalEntity extends TEntity,
  TCreateEntity extends unknown,
  TNewEntity extends unknown
> extends AbstractService {
  public isValid(
    entity: Readonly<TEntity | undefined>
  ): entity is TFinalEntity {
    return this.isSet(entity) && this.isUpToDate(entity);
  }

  public isSet(entity: Readonly<TEntity | undefined>): entity is TEntity {
    return !_.isNil(entity);
  }

  public getUpToDate(
    entity: Readonly<TEntity | undefined>,
    createEntity?: Readonly<TCreateEntity | undefined>
  ): TFinalEntity | TNewEntity {
    if (this.isSet(entity)) {
      if (!this.isUpToDate(entity)) {
        return this.upgrade(entity);
      }

      return entity;
    }

    return this.create(createEntity);
  }

  public abstract isUpToDate(entity: Readonly<TEntity>): entity is TFinalEntity;

  public abstract create(
    createEntity?: Readonly<TCreateEntity | undefined>
  ): TNewEntity;

  public abstract upgrade(entity: Readonly<TEntity>): TFinalEntity;
}
