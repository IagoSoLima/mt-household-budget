import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
});
