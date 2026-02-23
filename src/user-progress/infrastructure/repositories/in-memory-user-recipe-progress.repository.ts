import { UserRecipeProgress } from '../../domain/entities/user-recipe-progress.entity';
import { UserRecipeProgressRepository } from '../../domain/repositories/user-recipe-progress.repository';

export class InMemoryUserRecipeProgressRepository implements UserRecipeProgressRepository {
  private readonly progressMap = new Map<string, UserRecipeProgress>();

  public async save(userRecipeProgress: UserRecipeProgress): Promise<void> {
    this.progressMap.set(userRecipeProgress.id, userRecipeProgress);
  }

  public async findById(progressId: string): Promise<UserRecipeProgress | null> {
    return this.progressMap.get(progressId) ?? null;
  }
}
