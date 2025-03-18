import { DatabaseFactory } from './DatabaseFactory';

async function runMigrations() {
  await DatabaseFactory.getInstance().initialize();
  console.log('Migrations completed successfully');
  process.exit(0);
}

runMigrations().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
}); 