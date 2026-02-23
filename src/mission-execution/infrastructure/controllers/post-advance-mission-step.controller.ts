import { Express, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { AdvanceMissionStepUseCase } from '../../application/use-cases/advance-mission-step.use-case';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';

@injectable()
export class PostAdvanceMissionStepController {
  constructor(
    @inject(tokens.missionExecution.advanceMissionStepUseCase)
    private readonly advanceMissionStepUseCase: AdvanceMissionStepUseCase,
    @inject(tokens.missionExecution.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public register(app: Express): void {
    app.post('/missions/:missionId/advance-step', async (request: Request, response: Response) => {
      try {
        const missionId = String(request.params.missionId);
        await this.advanceMissionStepUseCase.execute({ missionId });
        const missionProgress = await this.missionProgressRepository.findById(missionId);

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
}
