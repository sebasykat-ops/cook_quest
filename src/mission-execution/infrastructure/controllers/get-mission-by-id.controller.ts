import { Express, Request, Response } from 'express';
import { Container } from 'inversify';
import { InMemoryMissionProgressRepository } from '../repositories/in-memory-mission-progress.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

export function registerGetMissionByIdController(app: Express, container: Container): void {
  app.get('/missions/:missionId', async (request: Request, response: Response) => {
    const missionProgressRepository = container.get<InMemoryMissionProgressRepository>(
      tokens.missionProgressRepository
    );
    const missionId = String(request.params.missionId);
    const missionProgress = await missionProgressRepository.findById(missionId);

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
