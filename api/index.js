// Vercel serverless entrypoint.
//
// Deliberately plain JavaScript requiring the `nest build` output rather than
// TypeScript importing src/ directly: Vercel's bundler compiles api/*.ts with
// its own settings and ignores the tsconfig "paths" mapping, so every alias
// import ('src/common/...', 'generated/prisma') failed at runtime with
// "Cannot find module". dist/ is produced by the build command beforehand and
// has all of those resolved to relative paths.
const fs = require('fs');
const path = require('path');

// Prisma finds its query engine by walking paths relative to the generated
// client's own location. Vercel's bundler inlines that client into a single
// file and does not carry the .node binary along, so the search fails with
// "Prisma Client could not locate the Query Engine". The binary itself is
// present — vercel.json ships generated/prisma/** into the lambda — so point
// Prisma straight at it. Guarded on existence so local runs are untouched.
if (!process.env.PRISMA_QUERY_ENGINE_LIBRARY) {
  const engine = path.join(
    process.cwd(),
    'generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node',
  );
  if (fs.existsSync(engine)) {
    process.env.PRISMA_QUERY_ENGINE_LIBRARY = engine;
  }
}

const serverless = require('../dist/src/serverless.js');

module.exports = serverless.default || serverless;
