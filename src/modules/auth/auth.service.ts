import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authRepository } from "./auth.repository";

export function authService(app: FastifyInstance) {
  const repo = authRepository(app);

  return {
    login: async (email: string, password: string) => {
      const user = await repo.findByEmail(email);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Senha incorreta");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return { user, token };
    }
  };
}
