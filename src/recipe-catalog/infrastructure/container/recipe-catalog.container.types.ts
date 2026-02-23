const recipeCatalogContainerTypes = {
  recipeRepository: Symbol.for('RecipeCatalog.RecipeRepository'),
  recipeStepRepository: Symbol.for('RecipeCatalog.RecipeStepRepository'),
  createRecipeUseCase: Symbol.for('RecipeCatalog.CreateRecipeUseCase'),
  getRecipesUseCase: Symbol.for('RecipeCatalog.GetRecipesUseCase'),
  getRecipeStepsUseCase: Symbol.for('RecipeCatalog.GetRecipeStepsUseCase')
};

export default recipeCatalogContainerTypes;
