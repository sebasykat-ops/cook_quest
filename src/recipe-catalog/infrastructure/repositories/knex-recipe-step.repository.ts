import { inject, injectable } from 'inversify';
import { Knex } from 'knex';
import { RecipeStep, RecipeStepPrimitives } from '@recipe-catalog/domain/entities/recipe-step.entity';
import { RecipeStepRepository } from '@recipe-catalog/domain/repositories/recipe-step.repository';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';

@injectable()
export class KnexRecipeStepRepository implements RecipeStepRepository {
  constructor(@inject(sharedKernelContainerTypes.knexClient) private readonly knexClient: Knex) {}

  public async saveMany(steps: RecipeStep[]): Promise<void> {
    for (const step of steps) {
      const data = step.toPrimitives();

      await this.knexClient
        .withSchema(recipeSchema)
        .table('recipe_steps')
        .insert({
          id: data.id,
          recipe_id: data.recipeId,
          step_order: data.order,
          instruction: data.instruction,
          tip: data.tip ?? null,
          timer_seconds: data.timerSeconds ?? null,
          requires_adult: data.requiresAdult,
          hazard: data.hazard ?? null
        })
        .onConflict('id')
        .merge();
    }
  }

  public async findByRecipeId(recipeId: string): Promise<RecipeStep[]> {
    const rows = await this.knexClient
      .withSchema(recipeSchema)
      .table('recipe_steps')
      .where({ recipe_id: recipeId })
      .orderBy('step_order', 'asc');

    return rows.map((row) => {
      const primitives: RecipeStepPrimitives = {
        id: row.id,
        recipeId: row.recipe_id,
        order: row.step_order,
        instruction: row.instruction,
        tip: row.tip ?? undefined,
        timerSeconds: row.timer_seconds ?? undefined,
        requiresAdult: Boolean(row.requires_adult),
        hazard: row.hazard ?? undefined
      };

      return RecipeStep.fromPrimitives(primitives);
    });
  }
}
