import { Knex } from 'knex';

export interface Migration {
  name: string;
  up(knexClient: Knex): Promise<void>;
  down(knexClient: Knex): Promise<void>;
}
