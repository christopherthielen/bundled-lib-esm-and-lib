var counter = 0;

export class VanillaJSClass {
  static logMessageFromVanillaLibrary() {
    console.log('This message logged from VanillaJSClass.logMessageFromVanillaLibrary()');
  }

  // Create an error so we can later get the stack trace with the source file name
  static createError() {
    return new Error();
  }

  id = counter++;
  constructor() {
    console.log("Creating an instance of VanillaJSClass");
  }
}
