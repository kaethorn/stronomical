import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { CoordinatesComponent } from 'src/app/coordinates/coordinates.component';
import { WindowProvider } from 'src/app/window.provider';

@NgModule({
  declarations: [CoordinatesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [CoordinatesComponent],
  providers: [
    WindowProvider
  ]
})
export class CoordinatesModule {}
