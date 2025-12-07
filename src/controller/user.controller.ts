import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { userService } from '../service/user.service';
import { createUserSchema, CreateUserDTO } from '../schemas/user.schema';
import { validateDTO } from '../utils/validateDTO';

export function userController(app: FastifyInstance) {
  const service = userService(app);

  return {
    getUsers: async (req: FastifyRequest, reply: FastifyReply) => {
      const users = await service.getUsers();
      return reply.send(users);
    },

    getUserById: async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string };
      const result = await service.getUserById(id);
      return reply.send(result);
    },

    getUserByName: async (req: FastifyRequest, reply: FastifyReply) => {
      const { name } = req.params as { name: string };
      const user = await service.getUserByName(name);
      return reply.send(user);
    },

    createUser: async (req: FastifyRequest, reply: FastifyReply) => {
      const parsed: CreateUserDTO = validateDTO(createUserSchema)(req, reply);

      const result = await service.register(parsed);
      return reply.code(201).send(result);
    },

    deleteUser: async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string };
      const result = await service.deleteUser(id);
      return reply.send(result);
    },
  };
}
