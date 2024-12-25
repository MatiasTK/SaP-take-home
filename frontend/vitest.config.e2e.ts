/// <reference types="vitest" />

import { defineConfig, ViteUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths(), react()] as ViteUserConfig['plugins'],
  test: {
    name: 'e2e tests',
    globals: true,
    silent: true,
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
    include: ['tests/e2e/**/*.test.tsx'],
  },
});
