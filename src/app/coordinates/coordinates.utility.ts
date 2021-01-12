export interface Sexagesimal {
  decimal: number;
  degrees: number;
  minutes: number;
  seconds: number;
}

export enum SexagesimalOrientation {
  North = 'North',
  South = 'South',
  East = 'East',
  West = 'West'
}

export interface SexagesimalCoordinate {
  coordinate: Sexagesimal;
  orientation: SexagesimalOrientation;
}

export interface SexagesimalCoordinates {
  latitude: SexagesimalCoordinate;
  longitude: SexagesimalCoordinate;
}

export class CoordinatesUtility {

  public static toDegrees(latitude: number, longitude: number): SexagesimalCoordinates {
    return {
      latitude: {
        coordinate: this.toSexagesimal(latitude),
        orientation: latitude >= 0 ?
          SexagesimalOrientation.North : SexagesimalOrientation.South
      },
      longitude: {
        coordinate: this.toSexagesimal(longitude),
        orientation: longitude >= 0 ?
          SexagesimalOrientation.East : SexagesimalOrientation.West
      }
    };
  }

  private static toSexagesimal(coordinate: number): Sexagesimal {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return {
      decimal: coordinate,
      degrees,
      minutes,
      seconds
    };
  }
}
