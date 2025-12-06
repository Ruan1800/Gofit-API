import { FastifyInstance } from 'fastify';
import { userController } from './user.controller';
import { authMiddleware } from "../../middlewares/auth.middleware";

export default async function userRoutes(app: FastifyInstance) {
  const controller = userController(app);

  app.get('/users', { preHandler: authMiddleware }, controller.getUsers);
  app.get('/users/:id', { preHandler: authMiddleware }, controller.getUserById);
  app.get('/users/search/:name', { preHandler: authMiddleware }, controller.getUserByName);
  app.post('/users', controller.createUser);
  app.delete('/users/:id', { preHandler: authMiddleware }, controller.deleteUser);
}
