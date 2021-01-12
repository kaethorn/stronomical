import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TimeComponent } from './time.component';

import { WindowProvider } from 'src/app/window.provider';

@NgModule({
  declarations: [TimeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  exports: [TimeComponent],
  providers: [
    WindowProvider
  ]
})
export class TimeModule {}
