import { inject, injectable } from 'inversify';
import { Knex } from 'knex';
import { MissionProgress, MissionProgressPrimitives } from '@mission-execution/domain/entities/mission-progress.entity';
import { MissionProgressRepository } from '@mission-execution/domain/repositories/mission-progress.repository';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';

const missionSchema = process.env.MYSQL_MISSION_SCHEMA ?? 'cookquest_mission_execution';

@injectable()
export class KnexMissionProgressRepository implements MissionProgressRepository {
  constructor(@inject(sharedKernelContainerTypes.knexClient) private readonly knexClient: Knex) {}

  public async save(missionProgress: MissionProgress): Promise<void> {
    const data = missionProgress.toPrimitives();

    await this.knexClient
      .withSchema(missionSchema)
      .table('mission_progress')
      .insert({
        id: data.id,
        recipe_id: data.recipeId,
        current_step: data.currentStep,
        total_steps: data.totalSteps,
        is_completed: data.isCompleted,
        completed_times: data.completedTimes,
        step_completions: JSON.stringify(data.stepCompletions)
      })
      .onConflict('id')
      .merge();
  }

  public async findById(missionId: string): Promise<MissionProgress | null> {
    const row = await this.knexClient.withSchema(missionSchema).table('mission_progress').where({ id: missionId }).first();

    if (!row) {
      return null;
    }

    const primitives: MissionProgressPrimitives = {
      id: row.id,
      recipeId: row.recipe_id,
      currentStep: row.current_step,
      totalSteps: row.total_steps,
      isCompleted: Boolean(row.is_completed),
      completedTimes: row.completed_times,
      stepCompletions: parseStepCompletions(row.step_completions)
    };

    return MissionProgress.fromPrimitives(primitives);
  }
}

function parseStepCompletions(rawValue: unknown): Array<{ stepOrder: number; completedAt: string }> {
  if (!rawValue) {
    return [];
  }

  const normalize = (value: unknown): Array<{ stepOrder: number; completedAt: string }> => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter((item): item is { stepOrder: number; completedAt: string } => {
        if (!item || typeof item !== 'object') {
          return false;
        }

        const row = item as Record<string, unknown>;
        return typeof row.stepOrder === 'number' && typeof row.completedAt === 'string';
      })
      .map((item) => ({
        stepOrder: item.stepOrder,
        completedAt: item.completedAt
      }));
  };

  if (typeof rawValue === 'string') {
    try {
      return normalize(JSON.parse(rawValue));
    } catch {
      return [];
    }
  }

  return normalize(rawValue);
}
