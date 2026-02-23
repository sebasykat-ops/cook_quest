import { MissionProgress } from '@mission-execution/domain/entities/mission-progress.entity';

export interface MissionProgressRepository {
  save(missionProgress: MissionProgress): Promise<void>;
  findById(missionId: string): Promise<MissionProgress | null>;
}
