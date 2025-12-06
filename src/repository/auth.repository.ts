import { FastifyInstance } from "fastify";

export function authRepository(app: FastifyInstance) {
  return {
    findByEmail: async (email: string) => {
      return await app.prisma.user.findUnique({
        where: { email },
      });
    }
  };
}
