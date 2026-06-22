// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://voley-gong.github.io',
  base: '/sketch-calligraphy/',
  integrations: [react()],
});
