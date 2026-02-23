import { Express, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';

@injectable()
export class GetMissionByIdController {
  constructor(
    @inject(tokens.missionExecution.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public register(app: Express): void {
    app.get('/missions/:missionId', async (request: Request, response: Response) => {
      const missionId = String(request.params.missionId);
      const missionProgress = await this.missionProgressRepository.findById(missionId);

      if (!missionProgress) {
        response.status(404).json({ message: 'Mission not found' });
        return;
      }

      response.json({
        data: {
          missionId: missionProgress.id.value,
          recipeId: missionProgress.recipeId,
          currentStep: missionProgress.currentStep,
          isCompleted: missionProgress.isCompleted
        }
      });
    });
  }
}
