export const tokens = {
  recipeCatalog: {
    recipeRepository: Symbol.for('recipeCatalog.recipeRepository'),
    createRecipeUseCase: Symbol.for('recipeCatalog.createRecipeUseCase')
  },
  missionExecution: {
    missionProgressRepository: Symbol.for('missionExecution.missionProgressRepository'),
    advanceMissionStepUseCase: Symbol.for('missionExecution.advanceMissionStepUseCase')
  }
};
