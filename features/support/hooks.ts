import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { DatabaseFactory } from '../../src/infrastructure/database/DatabaseFactory';
import { CustomWorld } from './world';
import * as schema from '../../src/infrastructure/database/schema';

BeforeAll(async function () {
  // Database initialization is now handled by the DatabaseFactory in the World
});

Before(async function (this: CustomWorld) {
  // Clean up existing data before each scenario
  const db = DatabaseFactory.getInstance().getDatabase();
  await db.delete(schema.competitiveAdvantages);
  await db.delete(schema.marketPositions);
  await db.delete(schema.competitors);
});

After(async function (this: CustomWorld) {
  // Clean up after each scenario
  this.currentCompetitor = undefined;
  this.currentCompetitorId = undefined;
  this.error = undefined;
});

AfterAll(async function () {
  // Close the database connection
  DatabaseFactory.getInstance().closeConnection();
}); 