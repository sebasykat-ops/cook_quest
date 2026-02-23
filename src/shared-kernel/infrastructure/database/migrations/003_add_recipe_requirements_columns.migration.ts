import { Knex } from 'knex';
import { Migration } from '@shared/infrastructure/database/migrations/migration.types';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';

async function hasColumn(knexClient: Knex, tableName: string, columnName: string): Promise<boolean> {
  const result = await knexClient
    .select('COLUMN_NAME')
    .from('information_schema.COLUMNS')
    .where({
      TABLE_SCHEMA: recipeSchema,
      TABLE_NAME: tableName,
      COLUMN_NAME: columnName
    })
    .first();

  return Boolean(result);
}

export const addRecipeRequirementsColumnsMigration: Migration = {
  name: '003_add_recipe_requirements_columns',
  async up(knexClient: Knex): Promise<void> {
    const hasIngredients = await hasColumn(knexClient, 'recipes', 'ingredients');
    const hasUtensils = await hasColumn(knexClient, 'recipes', 'utensils');

    if (!hasIngredients) {
      await knexClient.raw(`ALTER TABLE \`${recipeSchema}\`.recipes ADD COLUMN ingredients JSON NULL`);
    }

    if (!hasUtensils) {
      await knexClient.raw(`ALTER TABLE \`${recipeSchema}\`.recipes ADD COLUMN utensils JSON NULL`);
    }
  },
  async down(knexClient: Knex): Promise<void> {
    const hasIngredients = await hasColumn(knexClient, 'recipes', 'ingredients');
    const hasUtensils = await hasColumn(knexClient, 'recipes', 'utensils');

    if (hasIngredients) {
      await knexClient.raw(`ALTER TABLE \`${recipeSchema}\`.recipes DROP COLUMN ingredients`);
    }

    if (hasUtensils) {
      await knexClient.raw(`ALTER TABLE \`${recipeSchema}\`.recipes DROP COLUMN utensils`);
    }
  }
};
