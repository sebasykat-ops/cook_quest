import { MissionProgress } from '../../domain/entities/mission-progress.entity';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';

export class InMemoryMissionProgressRepository implements MissionProgressRepository {
  private readonly missionProgressMap = new Map<string, MissionProgress>();

  public async save(missionProgress: MissionProgress): Promise<void> {
    this.missionProgressMap.set(missionProgress.id.value, missionProgress);
  }

  public async findById(missionId: string): Promise<MissionProgress | null> {
    return this.missionProgressMap.get(missionId) ?? null;
  }
}
