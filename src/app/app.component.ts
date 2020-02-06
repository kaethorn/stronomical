import { Component } from '@angular/core';

export interface Sexagesimal {
  decimal: number;
  degrees: number;
  minutes: number;
  seconds: number;
}

export enum SexagesimalOrientation {
  N,
  S,
  E,
  W
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
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  status = '';
  utc = new Date().toUTCString();

  constructor() {
    this.locate();
    setInterval(() => {
      this.utc = new Date().toUTCString();
    }, 1000);
  }

  locate() {
    if ('geolocation' in navigator) {
      status = 'Locating…';
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const coordinates = this.toDegrees(position.coords);
        this.status += `lat: ${ coordinates.latitude.coordinate.degrees }°, `;
        this.status += `${ coordinates.latitude.coordinate.minutes }', `;
        this.status += `${ coordinates.latitude.coordinate.seconds }'' `;
        this.status += `${ SexagesimalOrientation[coordinates.latitude.orientation] }; `;
        this.status += `lat: ${ coordinates.longitude.coordinate.degrees }°, `;
        this.status += `${ coordinates.longitude.coordinate.minutes }', `;
        this.status += `${ coordinates.longitude.coordinate.seconds }'' `;
        this.status += `${ SexagesimalOrientation[coordinates.longitude.orientation] }; `;
      }, () => {
        this.status = 'Unable to retrieve your location';
      }, {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
      });
    } else {
      status = 'Geolocation is not supported by your browser';
    }
  }

  private toDegrees(coordinates: Coordinates): SexagesimalCoordinates {
    return {
      latitude: {
        coordinate: this.toSexagesimal(coordinates.latitude),
        orientation: (0.0 <= coordinates.latitude && coordinates.latitude <= 90.0) ?
          SexagesimalOrientation.N : SexagesimalOrientation.S
      },
      longitude: {
        coordinate: this.toSexagesimal(coordinates.longitude),
        orientation: (0.0 <= coordinates.longitude && coordinates.longitude <= 180.0) ?
          SexagesimalOrientation.E : SexagesimalOrientation.W
      }
    };
  }

  private toSexagesimal(coordinate: number): Sexagesimal {
    const degrees = Math.floor(coordinate);
    const minutes = Math.floor((coordinate - degrees) * 60);
    const seconds = (coordinate - degrees - (minutes / 60)) * 3600;
    return {
      decimal: coordinate,
      degrees,
      minutes,
      seconds
    };
  }
}
