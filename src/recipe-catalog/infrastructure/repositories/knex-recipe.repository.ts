import { inject, injectable } from 'inversify';
import { Knex } from 'knex';
import { Recipe, RecipePrimitives } from '@recipe-catalog/domain/entities/recipe.entity';
import { RecipeRepository } from '@recipe-catalog/domain/repositories/recipe.repository';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';

@injectable()
export class KnexRecipeRepository implements RecipeRepository {
  constructor(@inject(sharedKernelContainerTypes.knexClient) private readonly knexClient: Knex) {}

  public async save(recipe: Recipe): Promise<void> {
    const data = recipe.toPrimitives();

    await this.knexClient
      .withSchema(recipeSchema)
      .table('recipes')
      .insert({
        id: data.id,
        title: data.title,
        difficulty: data.difficulty,
        total_minutes: data.totalMinutes,
        requires_adult: data.requiresAdult,
        ingredients: JSON.stringify(data.ingredients),
        utensils: JSON.stringify(data.utensils)
      })
      .onConflict('id')
      .merge();
  }

  public async findById(recipeId: string): Promise<Recipe | null> {
    const row = await this.knexClient.withSchema(recipeSchema).table('recipes').where({ id: recipeId }).first();

    if (!row) {
      return null;
    }

    const primitives: RecipePrimitives = {
      id: row.id,
      title: row.title,
      difficulty: row.difficulty,
      totalMinutes: row.total_minutes,
      requiresAdult: Boolean(row.requires_adult),
      ingredients: parseStringArray(row.ingredients),
      utensils: parseStringArray(row.utensils)
    };

    return Recipe.fromPrimitives(primitives);
  }

  public async findAll(): Promise<Recipe[]> {
    const rows = await this.knexClient.withSchema(recipeSchema).table('recipes').orderBy('title', 'asc');

    return rows.map((row) =>
      Recipe.fromPrimitives({
        id: row.id,
        title: row.title,
        difficulty: row.difficulty,
        totalMinutes: row.total_minutes,
        requiresAdult: Boolean(row.requires_adult),
        ingredients: parseStringArray(row.ingredients),
        utensils: parseStringArray(row.utensils)
      })
    );
  }
}

function parseStringArray(rawValue: unknown): string[] {
  if (!rawValue) {
    return [];
  }

  if (Array.isArray(rawValue)) {
    return rawValue.map((item) => String(item));
  }

  if (typeof rawValue === 'string') {
    try {
      const parsed = JSON.parse(rawValue);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item));
      }
      return [];
    } catch {
      return [];
    }
  }

  return [];
}
