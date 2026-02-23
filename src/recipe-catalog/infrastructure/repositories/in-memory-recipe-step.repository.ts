import { injectable } from 'inversify';
import { RecipeStep } from '@recipe-catalog/domain/entities/recipe-step.entity';
import { RecipeStepRepository } from '@recipe-catalog/domain/repositories/recipe-step.repository';

@injectable()
export class InMemoryRecipeStepRepository implements RecipeStepRepository {
  private readonly stepsByRecipeId = new Map<string, RecipeStep[]>();

  public async saveMany(steps: RecipeStep[]): Promise<void> {
    const grouped = new Map<string, RecipeStep[]>();

    for (const step of steps) {
      const current = grouped.get(step.recipeId) ?? [];
      current.push(step);
      grouped.set(step.recipeId, current);
    }

    for (const [recipeId, recipeSteps] of grouped.entries()) {
      recipeSteps.sort((a, b) => a.order - b.order);
      this.stepsByRecipeId.set(recipeId, recipeSteps);
    }
  }

  public async findByRecipeId(recipeId: string): Promise<RecipeStep[]> {
    return this.stepsByRecipeId.get(recipeId) ?? [];
  }
}
