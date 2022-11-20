import { AbstractService } from '../../../classes/services/abstract.service';
import _ from 'lodash';

/**
 * @description
 * TODO Replace unknown types with real types like Object or IObject.
 * TODO Actually not possible due to https://github.com/microsoft/TypeScript/issues/15300#issuecomment-371353444.
 */
export abstract class FirebaseUpdateCoreService<
  TEntity,
  TFinalEntity extends TEntity,
  TCreateEntity,
  TNewEntity
> extends AbstractService {
  /**
   * @template TEntity, TEntity - The Firebase object to check.
   * @description
   * Check if the given object exists and is on the latest version.
   * @param   {TEntity | undefined} entity The object to check.
   * @returns {boolean}                    True when not undefined and on the latest version.
   */
  public isValid(entity: TEntity | undefined): entity is TFinalEntity {
    return this.isSet(entity) && this.isUpToDate(entity);
  }

  /**
   * @template TEntity, TEntity - The Firebase object to check.
   * @template TFinalEntity, TFinalEntity - The Firebase object to check, that was already on the latest version.
   * @description
   * Check if the given object exists.
   * @param   {TEntity | TFinalEntity | undefined} entity The object to check.
   * @returns {boolean}                                   True when not undefined.
   */
  public isSet(entity: TFinalEntity | undefined): entity is TFinalEntity;
  public isSet(entity: TEntity | undefined): entity is TEntity;
  public isSet(entity: TEntity | TFinalEntity | undefined): entity is TEntity | TFinalEntity {
    return !_.isNil(entity);
  }

  /**
   * @template TEntity, TEntity - The Firebase object to check.
   * @template TCreateEntity, TCreateEntity - The final version of the Firebase object to create, as a fallback.
   * @template TFinalEntity, TFinalEntity - The Firebase object given, that was already on the latest version.
   * @template TNewEntity, TNewEntity - The fallback object given, as a new object with the default values.
   * @description
   * Based on the given object:
   * - return it if already on the latest version
   * - return an updated object to the latest version if not on the latest version
   * - return a complete newly created object if undefined.
   * @param   {TEntity | undefined}       entity       The object to check.
   * @param   {TCreateEntity | undefined} createEntity Eventually an object containing some custom data. Very useful to customize the new object instead of having arbitrary default values.
   * @returns {TFinalEntity | TNewEntity}              An object possibly updated.
   */
  public getUpToDate(entity: TEntity | undefined, createEntity?: TCreateEntity | undefined): TFinalEntity | TNewEntity {
    if (this.isSet(entity)) {
      if (!this.isUpToDate(entity)) {
        return this.upgrade(entity);
      }

      return entity;
    }

    return this.create(createEntity);
  }

  /**
   * @template TEntity, TEntity - The Firebase object to check.
   * @template TFinalEntity, TFinalEntity - The Firebase object to check, that was already on the latest version.
   * @description
   * Check if the given object is already into the latest version.
   * @param   {TEntity | TFinalEntity} entity The object to check.
   * @returns {boolean}                       True when the given object is on the latest version.
   */
  public abstract isUpToDate(entity: TEntity | TFinalEntity): entity is TFinalEntity;

  /**
   * @template TCreateEntity, TCreateEntity - The Firebase object to create, with override values to replace the default ones.
   * @template TNewEntity, TNewEntity - The newly created Firebase object with the default values.
   * @description
   * Create a new object directly to the latest version.
   * @param   {TCreateEntity | undefined} createEntity Eventually an object containing some custom data. Very useful to customize the new object instead of having arbitrary default values.
   * @returns {TNewEntity}                             An object with explicit set value (basically no choices like "string | undefined").
   */
  public abstract create(createEntity?: TCreateEntity | undefined): TNewEntity;

  /**
   * @template TEntity, TEntity - The Firebase object to update.
   * @template TFinalEntity, TFinalEntity - The Firebase object to update, that was already on the latest version.
   * @description
   * Update the given object to the latest version if not up-to-date.
   * @param   {TEntity}      entity The original object on whatever version possible.
   * @returns {TFinalEntity}        An object upgraded on the latest version.
   */
  public abstract upgrade(entity: TEntity): TFinalEntity;
}
