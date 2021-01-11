import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoordinatesModule } from './coordinates/coordinates.module';
import { TimeModule } from './time/time.module';
import { WindowProvider } from './window.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    CoordinatesModule,
    TimeModule,
    BrowserAnimationsModule
  ],
  providers: [WindowProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
