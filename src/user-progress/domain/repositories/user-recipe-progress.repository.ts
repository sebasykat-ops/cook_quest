import { UserRecipeProgress } from '@user-progress/domain/entities/user-recipe-progress.entity';

export interface UserRecipeProgressRepository {
  save(userRecipeProgress: UserRecipeProgress): Promise<void>;
  findById(progressId: string): Promise<UserRecipeProgress | null>;
}
