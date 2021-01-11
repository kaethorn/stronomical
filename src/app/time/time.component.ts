import { Component, NgZone } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {

  public utc = new Date().toUTCString();

  constructor(
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).subscribe(() => {
        this.ngZone.run(() => {
          this.utc = new Date().toUTCString();
        });
      });
    });
  }
}
