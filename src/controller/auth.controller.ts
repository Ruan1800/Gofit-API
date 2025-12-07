import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { LoginDTO, loginSchema } from '../schemas/user.schema';
import { authService } from '../service/auth.service';
import { validateDTO } from '../utils/validateDTO';

export function authController(app: FastifyInstance) {
  const service = authService(app);

  return {
    login: async (req: FastifyRequest, reply: FastifyReply) => {
      const parsed: LoginDTO = validateDTO(loginSchema)(req, reply);
      const { email, password } = parsed;
      const result = await service.login(email, password);
      return reply.send(result);
    },
  };
}
