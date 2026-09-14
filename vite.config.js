import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync, mkdirSync } from 'node:fs';

const copyManagedMedia = () => ({
  name: 'copy-managed-media',
  closeBundle() {
    mkdirSync(resolve(import.meta.dirname, 'dist/assets'), { recursive: true });
    cpSync(resolve(import.meta.dirname, 'assets'), resolve(import.meta.dirname, 'dist/assets'), {
      recursive: true,
      force: true,
    });
  },
});

export default defineConfig({
  plugins: [copyManagedMedia()],
  build: {
    rollupOptions: {
      input: {
        website: resolve(import.meta.dirname, 'index.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
      },
    },
  },
});
