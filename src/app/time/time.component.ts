import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {

  public timeForm = new FormGroup({
    utc: new FormControl({ value: new Date().toUTCString(), disabled: true }),
    local: new FormControl({ value: new Date().toString(), disabled: true })
  });


  constructor(
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).subscribe(() => {
        this.ngZone.run(() => {
          this.timeForm.get('utc')?.setValue(new Date().toUTCString());
          this.timeForm.get('local')?.setValue(new Date().toString());
        });
      });
    });
  }
}
