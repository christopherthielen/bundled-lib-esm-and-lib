## Demonstration of possible bug in Angular AoT compiler

The Angular compiler generates ngfactory.js files for Angular Components/Modules.
Each symbol that is referenced by the component/module is located, then an import is added to the generated ngfactory.js file.

```ts
@NgModule({
    providers: [
        { provide: VanillaJSClass, useClass: VanillaJSClass }
    ]
})
class MyModule {}
```

The import in the `ngfactory.js` file is a deep reference into the npm package, i.e:

```js

