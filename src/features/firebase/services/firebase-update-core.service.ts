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
  /**
   * @description
   * Check if the given object exists and is on the latest version
   *
   * @param {Readonly<TEntity | undefined>} entity The object to check
   *
   * @return {boolean} true when not undefined and on the latest version
   */
  public isValid(
    entity: Readonly<TEntity | undefined>
  ): entity is TFinalEntity {
    return this.isSet(entity) && this.isUpToDate(entity);
  }

  /**
   * @description
   * Check if the given object exists
   *
   * @param {Readonly<TEntity | undefined>} entity The object to check
   *
   * @return {boolean} true when not undefined
   */
  public isSet(entity: Readonly<TEntity | undefined>): entity is TEntity {
    return !_.isNil(entity);
  }

  /**
   * @description
   * Based on the given object:
   * - return it if already on the latest version
   * - return an updated object to the latest version if not on the latest version
   * - return a complete newly created object if undefined
   *
   * @param {Readonly<TEntity | undefined>} entity The object to check
   * @param {Readonly<TCreateEntity | undefined>} createEntity Eventually an object containing some custom data.
   * Very useful to customize the new object instead of having arbitrary default values
   *
   * @return {TFinalEntity | TNewEntity} An object possibly updated
   */
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

  /**
   * @description
   * Check if the given object is already into the latest version
   *
   * @param {Readonly<TEntity>} entity The object to check
   *
   * @return {boolean} true when the given object is on the latest version
   */
  public abstract isUpToDate(entity: Readonly<TEntity>): entity is TFinalEntity;

  /**
   * @description
   * Create a new object directly to the latest version
   *
   * @param {Readonly<TCreateEntity | undefined>} createEntity Eventually an object containing some custom data.
   * Very useful to customize the new object instead of having arbitrary default values
   *
   * @return {TNewEntity} An object with explicit set value (basically no choices like "string | undefined")
   */
  public abstract create(
    createEntity?: Readonly<TCreateEntity | undefined>
  ): TNewEntity;

  /**
   * @description
   * Update the given object to the latest version if not up-to-date
   *
   * @param {Readonly<TEntity>} entity The original object on whatever version possible
   *
   * @return {TFinalEntity} An object upgraded on the latest version
   */
  public abstract upgrade(entity: Readonly<TEntity>): TFinalEntity;
}
