import { Knex } from 'knex';
import { Migration } from '@shared/infrastructure/database/migrations/migration.types';

const missionSchema = process.env.MYSQL_MISSION_SCHEMA ?? 'cookquest_mission_execution';

export const createMissionExecutionSchemaMigration: Migration = {
  name: '002_create_mission_execution_schema',
  async up(knexClient: Knex): Promise<void> {
    await knexClient.raw(`CREATE DATABASE IF NOT EXISTS \`${missionSchema}\``);

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
  },
  async down(knexClient: Knex): Promise<void> {
    await knexClient.raw(`DROP TABLE IF EXISTS \`${missionSchema}\`.mission_progress`);
  }
};
