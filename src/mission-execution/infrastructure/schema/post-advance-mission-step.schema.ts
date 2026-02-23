import { z } from 'zod';

const postAdvanceMissionStepSchema = z.object({
  missionId: z.string().min(1)
});

export default postAdvanceMissionStepSchema;
