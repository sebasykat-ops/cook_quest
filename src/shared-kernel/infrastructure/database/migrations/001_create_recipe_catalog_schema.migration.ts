import { Knex } from 'knex';
import { Migration } from '@shared/infrastructure/database/migrations/migration.types';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';

export const createRecipeCatalogSchemaMigration: Migration = {
  name: '001_create_recipe_catalog_schema',
  async up(knexClient: Knex): Promise<void> {
    await knexClient.raw(`CREATE DATABASE IF NOT EXISTS \`${recipeSchema}\``);

    await knexClient.raw(`
      CREATE TABLE IF NOT EXISTS \`${recipeSchema}\`.recipes (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        difficulty VARCHAR(32) NOT NULL,
        total_minutes INT NOT NULL,
        requires_adult BOOLEAN NOT NULL,
        ingredients JSON NULL,
        utensils JSON NULL
      )
    `);

    await knexClient.raw(`
      CREATE TABLE IF NOT EXISTS \`${recipeSchema}\`.recipe_steps (
        id VARCHAR(191) PRIMARY KEY,
        recipe_id VARCHAR(191) NOT NULL,
        step_order INT NOT NULL,
        instruction TEXT NOT NULL,
        tip TEXT NULL,
        timer_seconds INT NULL,
        requires_adult BOOLEAN NOT NULL,
        hazard VARCHAR(32) NULL,
        INDEX idx_recipe_steps_recipe_id (recipe_id)
      )
    `);
  },
  async down(knexClient: Knex): Promise<void> {
    await knexClient.raw(`DROP TABLE IF EXISTS \`${recipeSchema}\`.recipe_steps`);
    await knexClient.raw(`DROP TABLE IF EXISTS \`${recipeSchema}\`.recipes`);
  }
};
