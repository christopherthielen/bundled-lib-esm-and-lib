## Demonstration of possible bug in Angular AoT compiler

The Angular compiler generates ngfactory.js files for Angular Components/Modules.
Each symbol that is referenced by the component/module is located, then an import is added to the generated ngfactory.js file.

```ts
import { VanillaJSClass } from 'vanillajslibrary';

@NgModule({
    providers: [
        { provide: VanillaJSClass, useClass: VanillaJSClass }
    ]
})
class MyModule {}
```

The import in the `ngfactory.js` file is a deep reference into the npm package, i.e:

```js
var i4 = require("vanillajslibrary/lib/vanillaJsClass");
```

The `vanillajslibrary` package publishes a UMD bundle and ESM, as well as typings.  The package's `main:` points to the UMD bundle.

```
  "main": "_bundles/vanillajslibrary.umd.js",
  "typings": "lib-esm/index.d.ts",
  "jsnext:main": "lib-esm/index.js",
```

Because of the combination of deep imports (in the generated `ngfactory.js` file) and index imports (user code, normal import from package index), the library is duplicated by the CLI when creating an AoT build.
`VanillaJSClass` is used as a DI token, but each reference (deep import, index import) are different objects.
This causes DI to fail when accessed programatically, i.e., `Injector.get(VanillaJSClass)`.


--------------------

# How to reproduce

- git clone git@github.com:christopherthielen/bundled-lib-esm-and-lib.git
- cd bundled-lib-esm-and-lib
- npm install
- npm start:jit # works fine
- npm start:aot # fails due to different DI tokens

### Reproduction repo details

The repository contains three packages:

- `vanillajslibrary`: This is intended to represent a vanilla JS library written in typescript.
- `angularlibrary`: This is intended to represent an angular library, wrapping or augmenting the vanilla js library.
- `angular-app-which-uses-angularlibrary`: This is an Angular-CLI app which uses `angularlibrary`.

### Scripts

Included in the reproduction are the following npm scripts:

- `start` (or `start:aot`): runs `npm start` in `angular-app-which-uses-angularlibrary`.  Use this to show the failing scenario.
- `start:jit`: runs `npm start:jit` in `angular-app-which-uses-angularlibrary`. Use this to contrast the behavior in JIT mode.
- `bump`: rebuilds `vanillajslibrary` and `angularlibrary`, then installs the newly built versions into `angular-app-which-uses-angularlibrary`.  Use this to make changes to the library code(s) and then check the behavior in `angular-app-which-uses-angularlibrary`.
