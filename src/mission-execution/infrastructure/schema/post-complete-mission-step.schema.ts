import { z } from 'zod';

const postCompleteMissionStepSchema = z.object({
  missionId: z.string().min(1)
});

export default postCompleteMissionStepSchema;
