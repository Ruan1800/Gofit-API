import { FastifyInstance } from "fastify";
import { authController } from "./auth.controller";

export default async function authRoutes(app: FastifyInstance) {
  const controller = authController(app);

  app.post("/auth/login", controller.login);
}
