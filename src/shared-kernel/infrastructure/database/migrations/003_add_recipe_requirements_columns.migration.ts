import { Knex } from 'knex';
import { Migration } from '@shared/infrastructure/database/migrations/migration.types';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';

export const addRecipeRequirementsColumnsMigration: Migration = {
  name: '003_add_recipe_requirements_columns',
  async up(knexClient: Knex): Promise<void> {
    const hasIngredients = await knexClient.schema.withSchema(recipeSchema).hasColumn('recipes', 'ingredients');
    const hasUtensils = await knexClient.schema.withSchema(recipeSchema).hasColumn('recipes', 'utensils');

    if (!hasIngredients) {
      await knexClient.schema.withSchema(recipeSchema).alterTable('recipes', (table) => {
        table.json('ingredients').nullable();
      });
    }

    if (!hasUtensils) {
      await knexClient.schema.withSchema(recipeSchema).alterTable('recipes', (table) => {
        table.json('utensils').nullable();
      });
    }
  },
  async down(knexClient: Knex): Promise<void> {
    const hasIngredients = await knexClient.schema.withSchema(recipeSchema).hasColumn('recipes', 'ingredients');
    const hasUtensils = await knexClient.schema.withSchema(recipeSchema).hasColumn('recipes', 'utensils');

    await knexClient.schema.withSchema(recipeSchema).alterTable('recipes', (table) => {
      if (hasIngredients) {
        table.dropColumn('ingredients');
      }

      if (hasUtensils) {
        table.dropColumn('utensils');
      }
    });
  }
};
