import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

export type DrizzleDatabase = ReturnType<typeof drizzle>;

export class DatabaseFactory {
  private static instance: DatabaseFactory;
  private db: Database | null = null;
  private drizzleDb: DrizzleDatabase | null = null;

  private constructor() { }

  public static getInstance(): DatabaseFactory {
    if (!DatabaseFactory.instance) {
      DatabaseFactory.instance = new DatabaseFactory();
    }
    return DatabaseFactory.instance;
  }

  public async initialize(options: { inMemory?: boolean } = {}): Promise<DrizzleDatabase> {
    // Close existing connection if any
    if (this.db) {
      this.db.close();
    }

    // Create new connection
    this.db = new Database(options.inMemory ? ':memory:' : 'local.db');
    this.drizzleDb = drizzle(this.db);

    // Run migrations
    migrate(this.drizzleDb, { migrationsFolder: './src/infrastructure/database/migrations' });

    return this.drizzleDb;
  }

  public getDatabase(): DrizzleDatabase {
    if (!this.drizzleDb) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.drizzleDb;
  }

  public closeConnection(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.drizzleDb = null;
    }
  }
} 