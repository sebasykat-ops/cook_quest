import { ContainerModule } from 'inversify';
import { AdvanceMissionStepUseCase } from '../../application/use-cases/advance-mission-step.use-case';
import { GetMissionByIdController } from '../controllers/get-mission-by-id.controller';
import { PostAdvanceMissionStepController } from '../controllers/post-advance-mission-step.controller';
import { InMemoryMissionProgressRepository } from '../repositories/in-memory-mission-progress.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

export const missionExecutionContainer = new ContainerModule(({ bind }) => {
  bind(tokens.missionExecution.missionProgressRepository)
    .to(InMemoryMissionProgressRepository)
    .inSingletonScope();
  bind(tokens.missionExecution.advanceMissionStepUseCase).to(AdvanceMissionStepUseCase).inSingletonScope();
  bind(tokens.missionExecution.getMissionByIdController).to(GetMissionByIdController).inSingletonScope();
  bind(tokens.missionExecution.postAdvanceMissionStepController)
    .to(PostAdvanceMissionStepController)
    .inSingletonScope();
});
