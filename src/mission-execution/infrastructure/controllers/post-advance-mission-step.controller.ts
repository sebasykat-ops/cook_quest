import { Express, Request, Response } from 'express';
import { Container } from 'inversify';
import { AdvanceMissionStepUseCase } from '../../application/use-cases/advance-mission-step.use-case';
import { InMemoryMissionProgressRepository } from '../repositories/in-memory-mission-progress.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

export function registerPostAdvanceMissionStepController(app: Express, container: Container): void {
  app.post('/missions/:missionId/advance-step', async (request: Request, response: Response) => {
    try {
      const missionId = String(request.params.missionId);
      const advanceMissionStepUseCase = container.get<AdvanceMissionStepUseCase>(
        tokens.advanceMissionStepUseCase
      );
      const missionProgressRepository = container.get<InMemoryMissionProgressRepository>(
        tokens.missionProgressRepository
      );

      await advanceMissionStepUseCase.execute({ missionId });
      const missionProgress = await missionProgressRepository.findById(missionId);

      response.json({
        message: 'Mission step advanced',
        data: {
          missionId: missionProgress?.id.value,
          currentStep: missionProgress?.currentStep,
          isCompleted: missionProgress?.isCompleted
        }
      });
    } catch (error) {
      response.status(400).json({ message: (error as Error).message });
    }
  });
}
