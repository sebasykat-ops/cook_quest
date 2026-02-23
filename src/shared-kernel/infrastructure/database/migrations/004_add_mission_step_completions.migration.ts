import { Knex } from 'knex';
import { Migration } from '@shared/infrastructure/database/migrations/migration.types';

const missionSchema = process.env.MYSQL_MISSION_SCHEMA ?? 'cookquest_mission_execution';

async function hasColumn(knexClient: Knex, tableName: string, columnName: string): Promise<boolean> {
  const result = await knexClient
    .select('COLUMN_NAME')
    .from('information_schema.COLUMNS')
    .where({
      TABLE_SCHEMA: missionSchema,
      TABLE_NAME: tableName,
      COLUMN_NAME: columnName
    })
    .first();

  return Boolean(result);
}

export const addMissionStepCompletionsMigration: Migration = {
  name: '004_add_mission_step_completions',
  async up(knexClient: Knex): Promise<void> {
    const hasStepCompletions = await hasColumn(knexClient, 'mission_progress', 'step_completions');

    if (!hasStepCompletions) {
      await knexClient.raw(`ALTER TABLE \`${missionSchema}\`.mission_progress ADD COLUMN step_completions JSON NULL`);
    }
  },
  async down(knexClient: Knex): Promise<void> {
    const hasStepCompletions = await hasColumn(knexClient, 'mission_progress', 'step_completions');

    if (hasStepCompletions) {
      await knexClient.raw(`ALTER TABLE \`${missionSchema}\`.mission_progress DROP COLUMN step_completions`);
    }
  }
};
