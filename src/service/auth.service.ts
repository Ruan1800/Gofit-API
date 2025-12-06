import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repository";
import {
  NotFoundException,
  UnauthorizedException,
} from "../core/errors/http.exception";

export function authService(app: FastifyInstance) {
  const repo = userRepository(app);

  return {
    login: async (email: string, password: string) => {
      const user = await repo.findByEmail(email);

      if (!user) {
        throw new NotFoundException("Usuário não encontrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException("Senha inválida");
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
