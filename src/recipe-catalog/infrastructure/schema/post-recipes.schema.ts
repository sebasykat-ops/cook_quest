import { z } from 'zod';

const postRecipesSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  totalMinutes: z.number().int().positive(),
  requiresAdult: z.boolean()
});

export default postRecipesSchema;
