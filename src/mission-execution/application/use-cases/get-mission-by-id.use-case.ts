import { inject, injectable } from 'inversify';
import { UseCase } from '@shared/application/use-case';
import { NotFoundError } from '@shared/domain/errors/not-found-error';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { MissionProgressRepository } from '@mission-execution/domain/repositories/mission-progress.repository';
import { MissionProgressPrimitives } from '@mission-execution/domain/entities/mission-progress.entity';
import { GetMissionByIdDto } from '@mission-execution/application/dto/get-mission-by-id.dto';

@injectable()
export class GetMissionByIdUseCase implements UseCase<GetMissionByIdDto, MissionProgressPrimitives> {
  constructor(
    @inject(missionExecutionContainerTypes.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public async execute(request: GetMissionByIdDto): Promise<MissionProgressPrimitives> {
    const missionProgress = await this.missionProgressRepository.findById(request.missionId);

    if (!missionProgress) {
      throw new NotFoundError('Mission not found');
    }

    return missionProgress.toPrimitives();
  }
}
