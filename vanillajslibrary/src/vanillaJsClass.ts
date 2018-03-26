export class VanillaJSClass {
  static logMessageFromVanillaLibrary() {
    console.log('\n\n\nThis message logged from VanillaJSClass.logMessageFromVanillaLibrary()\n\n\n');
  }

  // Create an error so we can later get the stack trace with the source file name
  static createError() {
    return new Error();
  }
}
