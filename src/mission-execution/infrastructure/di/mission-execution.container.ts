import { ContainerModule } from 'inversify';
import { AdvanceMissionStepUseCase } from '../../application/use-cases/advance-mission-step.use-case';
import { InMemoryMissionProgressRepository } from '../repositories/in-memory-mission-progress.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import '../controllers';

export const missionExecutionContainer = new ContainerModule((bind) => {
  bind(tokens.missionExecution.missionProgressRepository)
    .to(InMemoryMissionProgressRepository)
    .inSingletonScope();
  bind(tokens.missionExecution.advanceMissionStepUseCase).to(AdvanceMissionStepUseCase).inSingletonScope();
});
