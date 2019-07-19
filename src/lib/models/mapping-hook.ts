import { MapperProfile } from "./mapper-profile";

export type MappingHook<TSource, TDest>
    = (src?: TSource, dest?: TDest, profile?: MapperProfile<TSource, TDest>)
        => TDest | void;