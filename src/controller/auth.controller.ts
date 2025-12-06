import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authService } from "../service/auth.service";

export function authController(app: FastifyInstance) {
  const service = authService(app);

  return {
    login: async (
      req: FastifyRequest<{ Body: LoginDTO }>,
      reply: FastifyReply
    ) => {
      const { email, password } = req.body;

      const result = await service.login(email, password);
      return reply.send(result);
    }
  };
}
