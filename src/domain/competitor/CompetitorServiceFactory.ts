import { CompetitorService } from './CompetitorService';
import { CompetitorRepository } from './CompetitorRepository';
import { CompetitorRepositoryFactory } from './CompetitorRepositoryFactory';

export class CompetitorServiceFactory {
  constructor(private readonly repositoryFactory: CompetitorRepositoryFactory) { }

  async createService(): Promise<CompetitorService> {
    const repository = await this.repositoryFactory.createRepository();
    return new CompetitorService(repository);
  }
} 