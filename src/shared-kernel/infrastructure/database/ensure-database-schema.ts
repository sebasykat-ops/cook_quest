import { Knex } from 'knex';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';
const missionSchema = process.env.MYSQL_MISSION_SCHEMA ?? 'cookquest_mission_execution';

export async function ensureDatabaseSchema(knexClient: Knex): Promise<void> {
  await knexClient.raw(`CREATE DATABASE IF NOT EXISTS \`${recipeSchema}\``);
  await knexClient.raw(`CREATE DATABASE IF NOT EXISTS \`${missionSchema}\``);

  await knexClient.raw(`
    CREATE TABLE IF NOT EXISTS \`${recipeSchema}\`.recipes (
      id VARCHAR(191) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      difficulty VARCHAR(32) NOT NULL,
      total_minutes INT NOT NULL,
      requires_adult BOOLEAN NOT NULL
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

  await knexClient.raw(`
    CREATE TABLE IF NOT EXISTS \`${missionSchema}\`.mission_progress (
      id VARCHAR(191) PRIMARY KEY,
      recipe_id VARCHAR(191) NOT NULL,
      current_step INT NOT NULL,
      total_steps INT NOT NULL,
      is_completed BOOLEAN NOT NULL,
      completed_times INT NOT NULL DEFAULT 0
    )
  `);
}
