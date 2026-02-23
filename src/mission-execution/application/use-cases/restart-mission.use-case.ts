import { inject, injectable } from 'inversify';
import { UseCase } from '@shared/application/use-case';
import { NotFoundError } from '@shared/domain/errors/not-found-error';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { MissionProgressRepository } from '@mission-execution/domain/repositories/mission-progress.repository';
import { RestartMissionDto } from '@mission-execution/application/dto/restart-mission.dto';

@injectable()
export class RestartMissionUseCase implements UseCase<RestartMissionDto, void> {
  constructor(
    @inject(missionExecutionContainerTypes.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public async execute(request: RestartMissionDto): Promise<void> {
    const missionProgress = await this.missionProgressRepository.findById(request.missionId);

    if (!missionProgress) {
      throw new NotFoundError('Mission not found');
    }

    missionProgress.restart();
    await this.missionProgressRepository.save(missionProgress);
  }
}
