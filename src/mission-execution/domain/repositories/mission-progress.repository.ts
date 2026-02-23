import { MissionProgress } from '../entities/mission-progress.entity';

export interface MissionProgressRepository {
  save(missionProgress: MissionProgress): Promise<void>;
  findById(missionId: string): Promise<MissionProgress | null>;
}
