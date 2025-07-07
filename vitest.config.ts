import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    reporters: ['default'],
    environment: 'node',
    include: ['**/*.{integration,unit,e2e,isolated}.ts'],
    exclude: ['node_modules'],
    setupFiles: ['./tests/vitestSetup.ts'],
    pool: 'forks',
    sequence: {
      concurrent: false,
    },
    deps: {
      optimizer: {
        ssr: {
          include: ['supertest'],
        },
      },
    },
    silent: false,
    logHeapUsage: true,
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 30000,
    retry: 1,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '**/*.spec.ts', '**/*.e2e-spec.ts'],
      all: true,
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'nodenext' },
    }),
  ],
});
