import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // @ts-ignore
  plugins: [react(), tsConfigPaths()],
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
    globals: true,
  },
});
