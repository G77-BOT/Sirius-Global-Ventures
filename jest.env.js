// Custom test environment to handle ES modules
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

class CustomJestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    // Add any custom setup here
  }

  async teardown() {
    // Add any custom teardown here
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

export default CustomJestEnvironment;
