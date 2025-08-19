/* global console */
/* global process */
/* eslint no-console: "off" */

import { writeFileSync } from 'fs';

async function build() {
  // Use dynamic imports to resolve packages in Vercel environments
  const dotenv = await import('dotenv');
  const esbuild = await import('esbuild');

  dotenv.config({ quiet: true });

  const options = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'browser',
    loader: { '.ts': 'ts', '.tsx': 'tsx' },
    resolveExtensions: ['.js', '.ts', '.tsx'],
    target: 'es2021',
    tsconfig: 'tsconfig.json',
    minifyWhitespace: true,
    minifyIdentifiers: false,
    minifySyntax: true,
    sourcemap: true,
    define: {
      'import.meta.env.NODE_ENV': '"production"',
      'import.meta.env.GOOGLE_AUTH_ORIGINS': `"${process.env.GOOGLE_AUTH_ORIGINS}"`,
      'import.meta.env.GOOGLE_CLIENT_ID': `"${process.env.GOOGLE_CLIENT_ID}"`,
    },
    external: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/notifications',
      '@mantine/react',
      '@medplum/core',
      '@medplum/fhir-router',
      '@medplum/mock',
      '@medplum/react-hooks',
      'prop-types',
      'react',
      'react-dom',
      'react-router',
    ],
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
