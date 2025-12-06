import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { userService } from '../service/user.service';

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

        createUser: async (
            req: FastifyRequest<{ Body: CreateUserDTO }>,
            reply: FastifyReply
        ) => {
            const { name, email, password } = req.body;

            const result = await service.register({
                name,
                email,
                password,
            });

            return reply.code(201).send(result);
        },

        deleteUser: async (req: FastifyRequest, reply: FastifyReply) => {
            const { id } = req.params as { id: string };
            const result = await service.deleteUser(id);
            return reply.send(result);
        }
    };
}
