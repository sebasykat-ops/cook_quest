import { z } from 'zod';

const getRecipeStepsSchema = z.object({
  recipeId: z.string().min(1)
});

export default getRecipeStepsSchema;
