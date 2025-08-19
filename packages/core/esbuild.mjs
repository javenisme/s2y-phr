/* global console */
/* global process */
/* eslint no-console: "off" */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import packageJson from './package.json' with { type: 'json' };

async function build() {
  // Use dynamic import to resolve esbuild in Vercel environments
  const esbuild = await import('esbuild');

  let gitHash;
  try {
    gitHash = execSync('git rev-parse --short HEAD').toString().trim();
  } catch (_error) {
    gitHash = 'unknown'; // Default value when not in a git repository
  }

  const medplumVersion = packageJson.version + '-' + gitHash;

  const options = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    loader: { '.ts': 'ts' },
    resolveExtensions: ['.ts'],
    target: 'es2021',
    tsconfig: 'tsconfig.json',
    minify: true,
    sourcemap: true,
    define: {
      'import.meta.env.NODE_ENV': '"production"',
      'import.meta.env.MEDPLUM_VERSION': `"${medplumVersion}"`,
    },
  };

  try {
    await esbuild.build({
      ...options,
      format: 'cjs',
      outfile: './dist/cjs/index.cjs',
    });
    writeFileSync('./dist/cjs/package.json', '{"type": "commonjs"}');

    await esbuild.build({
      ...options,
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
