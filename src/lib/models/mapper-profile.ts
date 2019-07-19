import { MappingExceptions } from './mapping-exceptions';
import { MappingHook } from './mapping-hook';

export interface MapperProfile<TSource, TDest> {
    /**
     * A dictionary of destination properties and their exceptions.
     * An exception can be either a source property name, or a lambda.
     * The lambda should take a TSource, and return a destination property value.
     */
    exceptions?: MappingExceptions<TSource, TDest>;

    /**
     * A mapping hook which returns a final TDest given 
     * the source object, current destination object,
     * and the profile.
     */
    afterMap?: MappingHook<TSource, TDest>;

    /**
     * A mapping hook which returns an initial TDest given
     * the source object and the profile. Can be used to construct
     * TDest objects (see destType property on the profile).
     */
    beforeMap?: MappingHook<TSource, TDest>;

    /**
     * The destination type. Intended for use by
     * afterMap and beforeMap functions.
     */
    destType?: { new(...args: any[]): TDest };
}