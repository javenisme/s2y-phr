/* global console */
/* global process */
/* eslint no-console: "off" */

import { execSync } from 'child_process';

try {
  console.log('Building with TypeScript...');
  execSync('npx --package=typescript tsc --project tsconfig.simple.json', { stdio: 'inherit' });
  console.log('Build completed successfully.');

} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}