import { FastifyInstance } from "fastify";
import { authController } from "../controller/auth.controller";

export default async function authRoutes(app: FastifyInstance) {
  const controller = authController(app);

  app.post("/login", controller.login);
}
