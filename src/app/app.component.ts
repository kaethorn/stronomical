import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { WINDOW_TOKEN } from 'src/app/window.provider';

export interface Sexagesimal {
  decimal: number;
  degrees: number;
  minutes: number;
  seconds: number;
}

export enum SexagesimalOrientation {
  North,
  South,
  East,
  West
}

export interface SexagesimalCoordinate {
  coordinate: Sexagesimal;
  orientation: SexagesimalOrientation;
}

export interface SexagesimalCoordinates {
  latitude: SexagesimalCoordinate;
  longitude: SexagesimalCoordinate;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public coordinates = 'Locating…';
  public utc = new Date().toUTCString();

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window
  ) {
    this.locate();
    this.window.setInterval(() => {
      this.utc = new Date().toUTCString();
    }, 1000);
  }

  public locate(): void {
    if ('geolocation' in this.window.navigator) {
      this.window.navigator.geolocation.getCurrentPosition((position: Position) => {
        const coordinates = this.toDegrees(position.coords);
        this.coordinates += `Latitude: ${coordinates.latitude.coordinate.degrees}°, `;
        this.coordinates += `${coordinates.latitude.coordinate.minutes}', `;
        this.coordinates += `${coordinates.latitude.coordinate.seconds}'' `;
        this.coordinates += `${SexagesimalOrientation[coordinates.latitude.orientation]}; `;
        this.coordinates += `Longitude: ${coordinates.longitude.coordinate.degrees}°, `;
        this.coordinates += `${coordinates.longitude.coordinate.minutes}', `;
        this.coordinates += `${coordinates.longitude.coordinate.seconds}'' `;
        this.coordinates += `${SexagesimalOrientation[coordinates.longitude.orientation]}; `;
      }, () => {
        this.coordinates = 'Unable to retrieve your location';
      }, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      });
    } else {
      this.coordinates = 'Geolocation is not supported by your browser';
    }
  }

  private toDegrees(coordinates: Coordinates): SexagesimalCoordinates {
    return {
      latitude: {
        coordinate: this.toSexagesimal(coordinates.latitude),
        orientation: coordinates.latitude >= 0 ?
          SexagesimalOrientation.North : SexagesimalOrientation.South
      },
      longitude: {
        coordinate: this.toSexagesimal(coordinates.longitude),
        orientation: coordinates.longitude >= 0 ?
          SexagesimalOrientation.East : SexagesimalOrientation.West
      }
    };
  }

  private toSexagesimal(coordinate: number): Sexagesimal {
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
