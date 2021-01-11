import { Component, Inject, NgZone } from '@angular/core';
import { interval } from 'rxjs';

import { CoordinatesUtility, SexagesimalOrientation } from 'src/app/coordinates/coordinates.utility';
import { WINDOW_TOKEN } from 'src/app/window.provider';

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent {

  public coordinates = 'Locating…';

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).subscribe(() => {
        this.ngZone.run(() => {
          this.locate();
        });
      });
    });
  }

  private locate(): void {
    if ('geolocation' in this.window.navigator) {
      this.window.navigator.geolocation.getCurrentPosition((position: Position) => {
        const coordinates = CoordinatesUtility.toDegrees(position.coords);
        this.coordinates = `Latitude: ${coordinates.latitude.coordinate.degrees}°, `;
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
}
