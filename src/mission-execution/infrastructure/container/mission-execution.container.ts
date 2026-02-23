import { ContainerModule } from 'inversify';
import { AdvanceMissionStepUseCase } from '@mission-execution/application/use-cases/advance-mission-step.use-case';
import { GetMissionByIdUseCase } from '@mission-execution/application/use-cases/get-mission-by-id.use-case';
import { KnexMissionProgressRepository } from '@mission-execution/infrastructure/repositories/knex-mission-progress.repository';
import { InMemoryMissionProgressRepository } from '@mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { RestartMissionUseCase } from '@mission-execution/application/use-cases/restart-mission.use-case';
import '@mission-execution/infrastructure/controllers';

export const missionExecutionContainer = new ContainerModule((bind) => {
  const useInMemory = process.env.NODE_ENV === 'test' || process.env.USE_IN_MEMORY === 'true';

  if (useInMemory) {
    bind(missionExecutionContainerTypes.missionProgressRepository)
      .to(InMemoryMissionProgressRepository)
      .inSingletonScope();
  } else {
    bind(missionExecutionContainerTypes.missionProgressRepository)
      .to(KnexMissionProgressRepository)
      .inSingletonScope();
  }
  bind(missionExecutionContainerTypes.advanceMissionStepUseCase).to(AdvanceMissionStepUseCase).inSingletonScope();
  bind(missionExecutionContainerTypes.getMissionByIdUseCase).to(GetMissionByIdUseCase).inSingletonScope();
  bind(missionExecutionContainerTypes.restartMissionUseCase).to(RestartMissionUseCase).inSingletonScope();
});
