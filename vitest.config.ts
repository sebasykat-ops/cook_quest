import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared-kernel'),
      '@recipe-catalog': path.resolve(__dirname, 'src/recipe-catalog'),
      '@mission-execution': path.resolve(__dirname, 'src/mission-execution'),
      '@safety-guidance': path.resolve(__dirname, 'src/safety-guidance'),
      '@user-progress': path.resolve(__dirname, 'src/user-progress')
    }
  },
  test: {
    environment: 'node'
  }
});
