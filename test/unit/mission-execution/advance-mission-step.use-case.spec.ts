import 'reflect-metadata';

import { describe, expect, it } from 'vitest';
import { AdvanceMissionStepUseCase } from '../../../src/mission-execution/application/use-cases/advance-mission-step.use-case';
import { MissionProgress } from '../../../src/mission-execution/domain/entities/mission-progress.entity';
import { MissionId } from '../../../src/mission-execution/domain/value-objects/mission-id.value-object';
import { InMemoryMissionProgressRepository } from '../../../src/mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';

describe('AdvanceMissionStepUseCase', () => {
  it('advances mission step', async () => {
    const missionProgressRepository = new InMemoryMissionProgressRepository();
    const advanceMissionStepUseCase = new AdvanceMissionStepUseCase(missionProgressRepository);

    await missionProgressRepository.save(
      MissionProgress.create(MissionId.create('mission-21'), {
        recipeId: 'recipe-22',
        currentStep: 1,
        totalSteps: 3,
        isCompleted: false
      })
    );

    await advanceMissionStepUseCase.execute({ missionId: 'mission-21' });

    const mission = await missionProgressRepository.findById('mission-21');
    expect(mission?.currentStep).toBe(2);
    expect(mission?.isCompleted).toBe(false);
  });
});
