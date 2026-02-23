import { Knex } from 'knex';
import { migrations } from '@shared/infrastructure/database/migrations/migration-registry';

const baseDatabase = process.env.MYSQL_DB ?? 'cookquest';

export async function runMigrationsUp(knexClient: Knex): Promise<void> {
  await knexClient.raw(`CREATE DATABASE IF NOT EXISTS \`${baseDatabase}\``);

  await knexClient.raw(`
    CREATE TABLE IF NOT EXISTS \`${baseDatabase}\`.migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  for (const migration of migrations) {
    const rows = await knexClient
      .withSchema(baseDatabase)
      .table('migrations')
      .where({ name: migration.name });

    if (rows.length > 0) {
      continue;
    }

    await migration.up(knexClient);
    await knexClient.withSchema(baseDatabase).table('migrations').insert({ name: migration.name });
  }
}
