const recipeCatalogContainerTypes = {
  recipeRepository: Symbol.for('RecipeCatalog.RecipeRepository'),
  createRecipeUseCase: Symbol.for('RecipeCatalog.CreateRecipeUseCase'),
  getRecipesUseCase: Symbol.for('RecipeCatalog.GetRecipesUseCase')
};

export default recipeCatalogContainerTypes;
