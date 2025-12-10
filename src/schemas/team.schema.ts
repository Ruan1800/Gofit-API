import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  members: z.array(z.string()).optional(),
});

export type CreateTeamDTO = z.infer<typeof createTeamSchema>;