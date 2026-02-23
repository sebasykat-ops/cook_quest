export const tokens = {
  sharedKernel: {
    getHealthController: Symbol.for('sharedKernel.getHealthController')
  },
  recipeCatalog: {
    recipeRepository: Symbol.for('recipeCatalog.recipeRepository'),
    createRecipeUseCase: Symbol.for('recipeCatalog.createRecipeUseCase'),
    getRecipesController: Symbol.for('recipeCatalog.getRecipesController'),
    postRecipesController: Symbol.for('recipeCatalog.postRecipesController')
  },
  missionExecution: {
    missionProgressRepository: Symbol.for('missionExecution.missionProgressRepository'),
    advanceMissionStepUseCase: Symbol.for('missionExecution.advanceMissionStepUseCase'),
    getMissionByIdController: Symbol.for('missionExecution.getMissionByIdController'),
    postAdvanceMissionStepController: Symbol.for('missionExecution.postAdvanceMissionStepController')
  }
};
