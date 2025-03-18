import { CompetitorRepository } from '../../domain/competitor/CompetitorRepository';
import { CompetitorRepositoryFactory as ICompetitorRepositoryFactory } from '../../domain/competitor/CompetitorRepositoryFactory';
import { SQLiteCompetitorRepository } from './SQLiteCompetitorRepository';
import { DatabaseFactory } from './DatabaseFactory';

export class CompetitorRepositoryFactory implements ICompetitorRepositoryFactory {
  constructor(private readonly inMemory: boolean = false) { }

  async createRepository(): Promise<CompetitorRepository> {
    const db = await DatabaseFactory.getInstance().initialize({ inMemory: this.inMemory });
    return new SQLiteCompetitorRepository(db);
  }
} 