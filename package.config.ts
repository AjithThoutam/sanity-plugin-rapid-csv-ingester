import {defineConfig} from '@sanity/pkg-utils'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
  legacyExports: true,
  dist: 'dist',
  tsconfig: 'tsconfig.dist.json',
  rollup: {
    plugins: [
      postcss({
        extract: false,
        minimize: true,
        plugins: [require('tailwindcss'), require('autoprefixer')],
      }),
    ],
  },
  // Remove this block to enable strict export validation
  extract: {
    rules: {
      'ae-forgotten-export': 'off',
      'ae-incompatible-release-tags': 'off',
      'ae-internal-missing-underscore': 'off',
      'ae-missing-release-tag': 'off',
    },
  },
})