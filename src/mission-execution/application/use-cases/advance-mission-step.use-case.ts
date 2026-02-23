import { inject, injectable } from 'inversify';
import { UseCase } from '../../../shared-kernel/application/use-case';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';
import { AdvanceMissionStepDto } from '../dto/advance-mission-step.dto';
import { NotFoundError } from '../../../shared-kernel/domain/errors/not-found-error';

@injectable()
export class AdvanceMissionStepUseCase implements UseCase<AdvanceMissionStepDto, void> {
  constructor(
    @inject(tokens.missionExecution.missionProgressRepository)
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
