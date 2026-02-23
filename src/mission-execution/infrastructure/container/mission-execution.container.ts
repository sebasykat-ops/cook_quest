import { ContainerModule } from 'inversify';
import { AdvanceMissionStepUseCase } from '@mission-execution/application/use-cases/advance-mission-step.use-case';
import { InMemoryMissionProgressRepository } from '@mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import '@mission-execution/infrastructure/controllers';

export const missionExecutionContainer = new ContainerModule((bind) => {
  bind(missionExecutionContainerTypes.missionProgressRepository)
    .to(InMemoryMissionProgressRepository)
    .inSingletonScope();
  bind(missionExecutionContainerTypes.advanceMissionStepUseCase).to(AdvanceMissionStepUseCase).inSingletonScope();
});
