import { CompetitorRepository } from './CompetitorRepository';

export interface CompetitorRepositoryFactory {
  /**
   * Creates a new instance of a CompetitorRepository.
   * The concrete implementation will be provided by the infrastructure layer.
   */
  createRepository(): Promise<CompetitorRepository>;
} 