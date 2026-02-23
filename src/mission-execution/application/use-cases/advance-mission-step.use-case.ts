import { UseCase } from '../../../shared-kernel/application/use-case';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';
import { AdvanceMissionStepDto } from '../dto/advance-mission-step.dto';

export class AdvanceMissionStepUseCase implements UseCase<AdvanceMissionStepDto, void> {
  constructor(private readonly missionProgressRepository: MissionProgressRepository) {}

  public async execute(request: AdvanceMissionStepDto): Promise<void> {
    const missionProgress = await this.missionProgressRepository.findById(request.missionId);

    if (!missionProgress) {
      throw new Error('Mission progress not found');
    }

    missionProgress.advanceStep();
    await this.missionProgressRepository.save(missionProgress);
  }
}
