import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoordinatesComponent } from 'src/app/coordinates/coordinates.component';
import { WindowProvider } from 'src/app/window.provider';

@NgModule({
  declarations: [CoordinatesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  exports: [CoordinatesComponent],
  providers: [
    WindowProvider
  ]
})
export class CoordinatesModule {}
