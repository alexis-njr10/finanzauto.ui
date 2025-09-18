export type Projector<TSource, TDestination> = (src: TSource) => TDestination;

export type ProfileRule<TSource, TDestination, K extends keyof TDestination = keyof TDestination> = {
  to: K;
  from?: keyof TSource;                        
  map?: (src: TSource) => TDestination[K];     
  const?: TDestination[K];                    
  ignore?: boolean;
};

export interface MappingProfile<TSource, TDestination> {
  rules: Array<ProfileRule<TSource, TDestination>>;
  factory?: () => Partial<TDestination>;
}

export interface IMapper {
  map<TSource extends object, TDestination extends object>(
    source: TSource,
    destinationClass: new () => TDestination
  ): TDestination;

  mapArray<TSource extends object, TDestination extends object>(
    sourceArray: TSource[],
    destinationClass: new () => TDestination
  ): TDestination[];

  mapTo<TSource, TDestination>(
    source: TSource,
    projector: Projector<TSource, TDestination>
  ): TDestination;

  mapArrayTo<TSource, TDestination>(
    sourceArray: TSource[],
    projector: Projector<TSource, TDestination>
  ): TDestination[];

  mapUsingProfile<TSource, TDestination>(
    source: TSource,
    profile: MappingProfile<TSource, TDestination>
  ): TDestination;

  mapArrayUsingProfile<TSource, TDestination>(
    sourceArray: TSource[],
    profile: MappingProfile<TSource, TDestination>
  ): TDestination[];
}