import { MapperProfile } from "./models";

export interface IMapper {
    /**
     * Creates a new instance of destType with properties recursively mapped from sourceObj.
     * @param sourceObj The object to map from.
     * @param destType A new-able destination type.
     * @param profile (optional) A mapping profile.
     * @returns A new instance of TDest
     */
    map<TSource, TDest>(
        sourceObj: TSource,
        destType: { new(): TDest },
        profile?: MapperProfile<TSource, TDest>
    ): TDest;

    /**
     * Recursively maps the sourceObject onto an existing destination object.
     * @param sourceObj The object to map from.
     * @param destObj The destination object.
     * @param profile (optional) A mapping profile.
     */
    mapOnto<TSource, TDest>(
        sourceObj: TSource,
        destObj: TDest,
        profile?: MapperProfile<TSource, TDest>
    ): TDest
}