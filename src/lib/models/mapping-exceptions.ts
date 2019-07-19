export type MappingExceptionRule<TSource>
    = keyof TSource
    | ((src?: TSource) => any);

export type MappingExceptions<TSource, TDest>
    = { [ key in keyof TDest]?: MappingExceptionRule<TSource>[] | MappingExceptionRule<TSource> };