import { z } from 'zod';

const getHealthSchema = z.object({
  params: z.object({}),
  query: z.object({})
});

export default getHealthSchema;
