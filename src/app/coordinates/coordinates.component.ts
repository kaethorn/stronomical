import { Component, Inject, NgZone } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

import { CoordinatesUtility, SexagesimalCoordinate } from 'src/app/coordinates/coordinates.utility';
import { WINDOW_TOKEN } from 'src/app/window.provider';

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent {

  public error = '';
  public positionForm = new FormGroup({
    latitudeDecimal: new FormControl(0, [Validators.required]),
    longitudeDecimal: new FormControl(0, [Validators.required]),
    latitudeSexagesimal: new FormControl({ value: '', disabled: true }),
    longitudeSexagesimal: new FormControl({ value: '', disabled: true }),
    useLocation: new FormControl(true)
  });

  private updater: Subscription = null as any;

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    private ngZone: NgZone
  ) {
    this.setUseLocation();
  }

  public get latitudeDecimal(): AbstractControl | null {
    return this.positionForm.get('latitudeDecimal');
  }

  public get longitudeDecimal(): AbstractControl | null {
    return this.positionForm.get('longitudeDecimal');
  }

  public get latitudeSexagesimal(): AbstractControl | null {
    return this.positionForm.get('latitudeSexagesimal');
  }

  public get longitudeSexagesimal(): AbstractControl | null {
    return this.positionForm.get('longitudeSexagesimal');
  }

  public get useLocation(): AbstractControl | null {
    return this.positionForm.get('useLocation');
  }

  public setUseLocation(): void {
    if (this.useLocation?.value) {
      if ('geolocation' in this.window.navigator) {
        this.latitudeDecimal?.disable();
        this.longitudeDecimal?.disable();
        this.ngZone.runOutsideAngular(() => {
          this.updater = interval(1000).subscribe(() => {
            this.ngZone.run(() => {
              this.locate();
            });
          });
        });
      } else {
        this.error = 'Geolocation is not supported by your browser';
        this.latitudeDecimal?.enable();
        this.longitudeDecimal?.enable();
        this.useLocation.setValue(false);
        this.useLocation.disable();
      }
    } else {
      this.latitudeDecimal?.enable();
      this.longitudeDecimal?.enable();
      this.updater?.unsubscribe();
    }
  }

  public convert(): void {
    const coordinates = CoordinatesUtility.toDegrees(this.latitudeDecimal?.value, this.longitudeDecimal?.value);
    this.latitudeSexagesimal?.setValue(this.formatDegrees(coordinates.latitude));
    this.longitudeSexagesimal?.setValue(this.formatDegrees(coordinates.longitude));
  }

  private formatDegrees(sexa: SexagesimalCoordinate): string {
    return `${sexa.coordinate.degrees}°, ${sexa.coordinate.minutes}', ${sexa.coordinate.seconds}" ${sexa.orientation}`;
  }

  private locate(): void {
    this.window.navigator.geolocation.getCurrentPosition((position: Position) => {
      this.latitudeDecimal?.setValue(position.coords.latitude);
      this.longitudeDecimal?.setValue(position.coords.longitude);
      this.convert();
    }, () => {
      this.error = 'Unable to retrieve your location';
    }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    });
  }
}
