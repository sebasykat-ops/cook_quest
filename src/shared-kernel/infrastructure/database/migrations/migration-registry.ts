import { Migration } from '@shared/infrastructure/database/migrations/migration.types';
import { createRecipeCatalogSchemaMigration } from '@shared/infrastructure/database/migrations/001_create_recipe_catalog_schema.migration';
import { createMissionExecutionSchemaMigration } from '@shared/infrastructure/database/migrations/002_create_mission_execution_schema.migration';
import { addRecipeRequirementsColumnsMigration } from '@shared/infrastructure/database/migrations/003_add_recipe_requirements_columns.migration';
import { addMissionStepCompletionsMigration } from '@shared/infrastructure/database/migrations/004_add_mission_step_completions.migration';

export const migrations: Migration[] = [
  createRecipeCatalogSchemaMigration,
  createMissionExecutionSchemaMigration,
  addRecipeRequirementsColumnsMigration,
  addMissionStepCompletionsMigration
];
