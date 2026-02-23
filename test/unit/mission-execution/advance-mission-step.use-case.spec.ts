import 'reflect-metadata';

import { describe, expect, it } from 'vitest';
import { AdvanceMissionStepUseCase } from '@mission-execution/application/use-cases/advance-mission-step.use-case';
import { MissionProgress } from '@mission-execution/domain/entities/mission-progress.entity';
import { MissionId } from '@mission-execution/domain/value-objects/mission-id.value-object';
import { InMemoryMissionProgressRepository } from '@mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';

describe('AdvanceMissionStepUseCase', () => {
  it('advances mission step', async () => {
    const missionProgressRepository = new InMemoryMissionProgressRepository();
    const advanceMissionStepUseCase = new AdvanceMissionStepUseCase(missionProgressRepository);

    await missionProgressRepository.save(
      MissionProgress.create(MissionId.create('mission-21'), 'recipe-22', 1, 3, false)
    );

    await advanceMissionStepUseCase.execute({ missionId: 'mission-21' });

    const mission = await missionProgressRepository.findById('mission-21');
    expect(mission?.currentStep).toBe(2);
    expect(mission?.isCompleted).toBe(false);
  });
});
