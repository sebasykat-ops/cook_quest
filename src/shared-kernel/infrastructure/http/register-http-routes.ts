import { Express } from 'express';
import { Container } from 'inversify';
import { registerGetHealthController } from '../controllers/get-health.controller';
import { registerGetRecipesController } from '../../../recipe-catalog/infrastructure/controllers/get-recipes.controller';
import { registerPostRecipesController } from '../../../recipe-catalog/infrastructure/controllers/post-recipes.controller';
import { registerGetMissionByIdController } from '../../../mission-execution/infrastructure/controllers/get-mission-by-id.controller';
import { registerPostAdvanceMissionStepController } from '../../../mission-execution/infrastructure/controllers/post-advance-mission-step.controller';

export function registerHttpRoutes(app: Express, container: Container): void {
  registerGetHealthController(app);
  registerGetRecipesController(app, container);
  registerPostRecipesController(app, container);
  registerGetMissionByIdController(app, container);
  registerPostAdvanceMissionStepController(app, container);
}
