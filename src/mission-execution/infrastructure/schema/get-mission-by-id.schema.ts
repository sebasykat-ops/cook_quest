import { z } from 'zod';

const getMissionByIdSchema = z.object({
  missionId: z.string().min(1)
});

export default getMissionByIdSchema;
