import { Entity } from '../../../shared-kernel/domain/entity';
import { MissionId } from '../value-objects/mission-id.value-object';

interface MissionProgressProps {
  recipeId: string;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

export class MissionProgress extends Entity<MissionId> {
  private constructor(id: MissionId, private missionProps: MissionProgressProps) {
    super(id);
  }

  public static create(id: MissionId, missionProps: MissionProgressProps): MissionProgress {
    if (missionProps.totalSteps <= 0) {
      throw new Error('Total steps must be greater than zero');
    }

    return new MissionProgress(id, missionProps);
  }

  public advanceStep(): void {
    if (this.missionProps.currentStep < this.missionProps.totalSteps) {
      this.missionProps.currentStep += 1;
    }

    if (this.missionProps.currentStep >= this.missionProps.totalSteps) {
      this.missionProps.isCompleted = true;
    }
  }

  public get recipeId(): string {
    return this.missionProps.recipeId;
  }

  public get currentStep(): number {
    return this.missionProps.currentStep;
  }

  public get isCompleted(): boolean {
    return this.missionProps.isCompleted;
  }
}
