import { inject, injectable } from 'inversify';
import { UseCase } from '@shared/application/use-case';
import { NotFoundError } from '@shared/domain/errors/not-found-error';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { MissionProgressRepository } from '@mission-execution/domain/repositories/mission-progress.repository';
import { AdvanceMissionStepDto } from '../dto/advance-mission-step.dto';

@injectable()
export class AdvanceMissionStepUseCase implements UseCase<AdvanceMissionStepDto, void> {
  constructor(
    @inject(missionExecutionContainerTypes.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public async execute(request: AdvanceMissionStepDto): Promise<void> {
    const missionProgress = await this.missionProgressRepository.findById(request.missionId);

    if (!missionProgress) {
      throw new NotFoundError('Mission progress not found');
    }

    missionProgress.advanceStep();
    await this.missionProgressRepository.save(missionProgress);
  }
}
