#!/usr/bin/env node
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/tsdocs
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/**
 * Run api-extractor against the monorepo
 */
const runExtractorForMonorepo = require('..').runExtractorForMonorepo;
const silent = process.argv.includes('--silent');
const dryRun = process.argv.includes('--dry-run');

async function main() {
  await runExtractorForMonorepo({silent, dryRun});
}

main();