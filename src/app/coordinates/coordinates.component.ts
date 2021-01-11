import { Component, Inject, NgZone } from '@angular/core';
import { interval } from 'rxjs';

import { CoordinatesUtility, SexagesimalCoordinates } from 'src/app/coordinates/coordinates.utility';
import { WINDOW_TOKEN } from 'src/app/window.provider';

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent {

  public coordinates: SexagesimalCoordinates = null as any;
  public error = '';

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
        this.coordinates = CoordinatesUtility.toDegrees(position.coords);
      }, () => {
        this.error = 'Unable to retrieve your location';
      }, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      });
    } else {
      this.error = 'Geolocation is not supported by your browser';
    }
  }
}
