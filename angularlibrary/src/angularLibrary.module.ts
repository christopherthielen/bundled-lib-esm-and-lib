import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VanillaJSClass } from 'vanillajslibrary';

import { AngularLibraryComponent } from './angularLibrary.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AngularLibraryComponent],
  entryComponents: [AngularLibraryComponent],
  exports: [AngularLibraryComponent],
  providers: [
    { provide: VanillaJSClass, useClass: VanillaJSClass }
  ]
})
export class AngularLibraryModule { }
