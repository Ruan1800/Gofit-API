import { FastifyInstance } from 'fastify';
import { userController } from '../controller/user.controller';
import { authMiddleware } from "../middlewares/auth.middleware";

export default async function userRoutes(app: FastifyInstance) {
  const controller = userController(app);

  app.get('/', { preHandler: authMiddleware }, controller.getUsers);
  app.get('/:id', { preHandler: authMiddleware }, controller.getUserById);
  app.get('/search/:name', { preHandler: authMiddleware }, controller.getUserByName);
  app.post('/', controller.createUser);
  app.delete('/:id', { preHandler: authMiddleware }, controller.deleteUser);
}
