import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { TimeComponent } from './time.component';

import { WindowProvider } from 'src/app/window.provider';

@NgModule({
  declarations: [TimeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [TimeComponent],
  providers: [
    WindowProvider
  ]
})
export class TimeModule {}
