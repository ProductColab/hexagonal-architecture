import type { Config } from 'drizzle-kit';

export default {
  schema: './src/infrastructure/database/schema.ts',
  out: './src/infrastructure/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './local.db',
  },
} satisfies Config; 