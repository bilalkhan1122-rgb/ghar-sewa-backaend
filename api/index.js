// Vercel serverless entrypoint.
//
// Deliberately plain JavaScript requiring the `nest build` output rather than
// TypeScript importing src/ directly: Vercel's bundler compiles api/*.ts with
// its own settings and ignores the tsconfig "paths" mapping, so every alias
// import ('src/common/...', 'generated/prisma') failed at runtime with
// "Cannot find module". dist/ is produced by the build command beforehand and
// has all of those resolved to relative paths.
const serverless = require('../dist/src/serverless.js');

module.exports = serverless.default || serverless;
