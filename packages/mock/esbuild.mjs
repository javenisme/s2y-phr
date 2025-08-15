/* global console */
/* global process */
/* eslint no-console: "off" */

import { writeFileSync } from 'fs';

async function build() {
  // Use dynamic import to resolve esbuild in Vercel environments
  const esbuild = await import('esbuild');

  const baseOptions = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    loader: {
      '.ts': 'ts'
    },
    resolveExtensions: ['.ts'],
    target: 'es2021',
    tsconfig: 'tsconfig.json',
    minify: true,
    sourcemap: true,
    external: ['@medplum/core', '@medplum/fhir-router', 'rfc6902'],
  };

  try {
    await esbuild.build({
      ...baseOptions,
      format: 'cjs',
      outfile: './dist/cjs/index.cjs',
    });
    writeFileSync('./dist/cjs/package.json', '{"type": "commonjs"}');

    await esbuild.build({
      ...baseOptions,
      format: 'esm',
      outfile: './dist/esm/index.mjs',
    });
    writeFileSync('./dist/esm/package.json', '{"type": "module"}');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Execute the build
build();