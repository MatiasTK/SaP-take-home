/// <reference types="vitest" />

import { defineConfig, ViteUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths(), react()] as ViteUserConfig['plugins'],
  test: {
    name: 'unit tests',
    environment: 'happy-dom',
    globals: true,
    setupFiles: './tests/setupTests.ts',
    include: ['tests/unit/**/*.test.tsx'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.tsx'],
    },
  },
});
