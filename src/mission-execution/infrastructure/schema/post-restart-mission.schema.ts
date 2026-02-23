import { z } from 'zod';

const postRestartMissionSchema = z.object({
  missionId: z.string().min(1)
});

export default postRestartMissionSchema;
