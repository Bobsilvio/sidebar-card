import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/sidebar-card.ts',
  output: {
    file: 'dist/sidebar-card.js',
    format: 'es',
    sourcemap: false, // Disabilita completamente i source maps
    sourcemapExcludeSources: true, // Non includere sorgenti nei source maps
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve({
      browser: true, // Usa le versioni browser dei moduli
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      typescript: require('typescript'),
      objectHashIgnoreUnknownHack: true,
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false, // Disabilita source maps in TypeScript
          inlineSourceMap: false,
          inlineSources: false,
          declaration: false,
          declarationMap: false,
        },
      },
    }),
    json(),
    dev &&
      serve({
        contentBase: 'dist',
        host: '0.0.0.0',
        port: 5000,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
    !dev && terser({
      compress: {
        drop_console: false, // Mantieni i console.log se necessario
      },
      output: {
        comments: false, // Rimuovi tutti i commenti (inclusi i riferimenti ai source maps)
      },
    }),
  ].filter(Boolean),
  
  // Silenzia warning innocui
  onwarn(warning, warn) {
    // Ignora warning "this is undefined" per librerie esterne
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    // Ignora warning per circular dependencies in node_modules
    if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.importer?.includes('node_modules')) return;
    // Mostra altri warning
    warn(warning);
  },
};

