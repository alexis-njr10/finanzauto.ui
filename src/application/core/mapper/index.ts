import { IMapper, MappingProfile, Projector } from "./interfaces/mapper.interface";

export class AutoMapper implements IMapper {
  map<TSource extends object, TDestination extends object>(
    source: TSource,
    destinationClass: new () => TDestination
  ): TDestination {
    const destination = new destinationClass();
    Object.keys(destination).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        (destination as any)[key] = (source as any)[key];
      }
    });
    return destination;
  }

  mapArray<TSource extends object, TDestination extends object>(
    sourceArray: TSource[],
    destinationClass: new () => TDestination
  ): TDestination[] {
    return sourceArray.map((src) => this.map(src, destinationClass));
  }

  mapTo<TSource, TDestination>(
    source: TSource,
    projector: Projector<TSource, TDestination>
  ): TDestination {
    return projector(source);
  }

  mapArrayTo<TSource, TDestination>(
    sourceArray: TSource[],
    projector: Projector<TSource, TDestination>
  ): TDestination[] {
    return sourceArray.map(projector);
  }

  mapUsingProfile<TSource, TDestination>(
    source: TSource,
    profile: MappingProfile<TSource, TDestination>
  ): TDestination {
    const base: any = profile.factory ? profile.factory() : {};
    for (const rule of profile.rules) {
      if (rule.ignore) continue;

      const key = rule.to as string;

      if (rule.map) {
        base[key] = rule.map(source);
        continue;
      }
      if (rule.const !== undefined) {
        base[key] = rule.const;
        continue;
      }
      if (rule.from) {
        base[key] = (source as any)[rule.from];
        continue;
      }
      base[key] = (source as any)[key];
    }
    return base as TDestination;
  }

  mapArrayUsingProfile<TSource, TDestination>(
    sourceArray: TSource[],
    profile: MappingProfile<TSource, TDestination>
  ): TDestination[] {
    return sourceArray.map((src) => this.mapUsingProfile(src, profile));
  }
}

export const mapper = new AutoMapper();

