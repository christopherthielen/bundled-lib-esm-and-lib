import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AngularLibraryModule } from 'angularlibrary';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularLibraryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
