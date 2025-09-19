import 'dotenv/config';
// drizzle-kit doesn't export `defineConfig` here; export a plain config object instead

export default {
  out: './drizzle',
  schema: './configs/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} as const;
