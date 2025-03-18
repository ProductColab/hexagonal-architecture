import { setWorldConstructor } from '@cucumber/cucumber';
import { CompetitorService } from '../../src/domain/competitor/CompetitorService';
import { CompetitorServiceFactory } from '../../src/domain/competitor/CompetitorServiceFactory';
import { CompetitorRepositoryFactory } from '../../src/infrastructure/database/CompetitorRepositoryFactory';
import { Competitor } from '../../src/domain/competitor/Competitor';
import { CompetitorId } from '../../src/domain/competitor/value-objects/CompetitorId';

export class CustomWorld {
  public currentCompetitor?: Competitor;
  public currentCompetitorId?: CompetitorId;
  public error?: Error;
  private competitorService?: CompetitorService;

  constructor() {
    this.initializeServices();
  }

  private async initializeServices(): Promise<void> {
    const repositoryFactory = new CompetitorRepositoryFactory(true); // Use in-memory database
    const serviceFactory = new CompetitorServiceFactory(repositoryFactory);
    this.competitorService = await serviceFactory.createService();
  }

  public getService(): CompetitorService {
    if (!this.competitorService) {
      throw new Error('CompetitorService not initialized');
    }
    return this.competitorService;
  }
}

setWorldConstructor(CustomWorld); 