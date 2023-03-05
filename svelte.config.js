import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { globSync as glob } from 'glob';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig),
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
  ],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    prerender: {
      entries: [
        '*',
        ...glob('./src/posts/*.{svelte.md,md,svx}').map((i) =>
          i
            .replace('src', '')
            .replace(/\.svelte\.md/, '')
            .replace(/\.md/, '')
            .replace(/\.svx/, ''),
        ),
      ],
    },
  },
};

export default config;
