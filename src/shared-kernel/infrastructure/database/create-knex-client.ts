import knex, { Knex } from 'knex';

export function createKnexClient(): Knex {
  return knex({
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST ?? '127.0.0.1',
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? '',
      database: process.env.MYSQL_DB ?? 'cookquest'
    },
    pool: {
      min: 0,
      max: 10
    }
  });
}
