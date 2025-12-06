import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { authService } from "../service/auth.service";


// definir pasta para interfaces
interface LoginBody {
  email: string;
  password: string;
}

export function authController(app: FastifyInstance) {
  const service = authService(app);

  return {
    login: async (
      req: FastifyRequest<{ Body: LoginBody }>,
      reply: FastifyReply
    ) => {
      try {
        const { email, password } = req.body;

        const result = await service.login(email, password);

        return reply.send(result);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    }
  };
}
