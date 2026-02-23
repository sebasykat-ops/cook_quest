import { z } from 'zod';

const getRecipesSchema = z.object({
  query: z.object({})
});

export default getRecipesSchema;
