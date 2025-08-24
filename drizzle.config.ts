require('dotenv/config');
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  schema: './configs/schema.ts',
  dialect: 'postgresql',
  // DB credentials will be configured for GCP
});