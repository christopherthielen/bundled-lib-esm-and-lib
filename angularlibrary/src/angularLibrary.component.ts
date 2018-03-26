import { Component, Injector } from '@angular/core';
import { VanillaJSClass } from 'vanillajslibrary';

@Component({
  selector: 'angular-library-component',
  styles: [`
    .instances {
      text-align: left;
      background-color: red;
      padding: 1em;
    }
    .instances.objectsmatch {
      background-color: green;
    }
  `],
  template: `
    <h1>Angular library component</h1>
    <div class="instances" [class.objectsmatch]="objectsMatch">
      <b>Instances {{ objectsMatch ? "match (are the same reference)" : "do not match (are not the same reference)" }}</b>
      <ul>
        <li>Instance from Component DI: <code>{{ instanceFromComponentDIStringified }}</code></li>
        <li>Instance from Injector.get(): <code>{{ instanceFromInjectorStringified }}</code></li>
      </ul>
    </div>

    <p>
      Open the console and hit refresh.
      Note the names of the files.  
      Similar output on the console should have the same file names/line numbers.
      However, in AoT mode you should notice some coming from <code>vanillaJsClass.js</code> and some coming from <code>vanillajslibrary.umd.js</code>.
    </p>
   `
})
export class AngularLibraryComponent {
  instanceFromComponentDI: VanillaJSClass;
  instanceFromInjector: VanillaJSClass;
  objectsMatch: boolean;

  instanceFromComponentDIStringified: string;
  instanceFromInjectorStringified: string;

  constructor(instanceFromComponentDI: VanillaJSClass, injector: Injector) { 
    this.instanceFromComponentDI = instanceFromComponentDI;
    this.instanceFromInjector = injector.get(VanillaJSClass, null);

    this.objectsMatch = this.instanceFromComponentDI === this.instanceFromInjector;

    this.instanceFromComponentDIStringified = JSON.stringify(this.instanceFromComponentDI);
    this.instanceFromInjectorStringified = JSON.stringify(this.instanceFromInjector);

    console.log("instance from component DI", this.instanceFromComponentDI);
    console.log("instance injected using local token", this.instanceFromInjector);

    const ClassFromComponentDI: typeof VanillaJSClass = this.instanceFromComponentDI.constructor as any;
    const ClassFromInjector: typeof VanillaJSClass = VanillaJSClass;

    logClassInfo(ClassFromComponentDI);
    logClassInfo(ClassFromInjector);

    function logClassInfo(ClassRef: typeof VanillaJSClass) {
      ClassRef.logMessageFromVanillaLibrary();
      const error = ClassRef.createError();
      console.log(error);
    }
  }
}
