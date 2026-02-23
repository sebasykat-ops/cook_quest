import { Express } from 'express';
import { Container } from 'inversify';
import { GetMissionByIdController } from '../../../mission-execution/infrastructure/controllers/get-mission-by-id.controller';
import { PostAdvanceMissionStepController } from '../../../mission-execution/infrastructure/controllers/post-advance-mission-step.controller';
import { GetRecipesController } from '../../../recipe-catalog/infrastructure/controllers/get-recipes.controller';
import { PostRecipesController } from '../../../recipe-catalog/infrastructure/controllers/post-recipes.controller';
import { tokens } from '../di/tokens';
import { GetHealthController } from '../controllers/get-health.controller';

export function registerHttpRoutes(app: Express, container: Container): void {
  const getHealthController = container.get<GetHealthController>(tokens.sharedKernel.getHealthController);
  const getRecipesController = container.get<GetRecipesController>(tokens.recipeCatalog.getRecipesController);
  const postRecipesController = container.get<PostRecipesController>(tokens.recipeCatalog.postRecipesController);
  const getMissionByIdController = container.get<GetMissionByIdController>(
    tokens.missionExecution.getMissionByIdController
  );
  const postAdvanceMissionStepController = container.get<PostAdvanceMissionStepController>(
    tokens.missionExecution.postAdvanceMissionStepController
  );

  getHealthController.register(app);
  getRecipesController.register(app);
  postRecipesController.register(app);
  getMissionByIdController.register(app);
  postAdvanceMissionStepController.register(app);
}
