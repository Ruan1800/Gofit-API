import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { userService } from '../service/user.service';

// definir pasta para interfaces
interface CreateUserBody {
    name: string;
    email: string;
    password: string;
}

export function userController(app: FastifyInstance) {
    const service = userService(app);

    return {
        getUsers: async (req: FastifyRequest, reply: FastifyReply) => {
            const users = await service.getUsers();
            return reply.send(users);
        },

        getUserById: async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                const { id } = req.params as { id: string };
                const result = await service.getUserById(id);
                return reply.send(result);
            } catch (err: any) {
                return reply.code(400).send({ error: err.message });
            }
        },

        getUserByName: async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                const { name } = req.params as { name: string };
                const user = await service.getUserByName(name);
                return reply.send(user);
            } catch (err: any) {
                return reply.code(400).send({ error: err.message });
            }
        },

        createUser: async (
            req: FastifyRequest<{ Body: CreateUserBody }>,
            reply: FastifyReply
        ) => {
            try {
                const { name, email, password } = req.body;

                const result = await service.register({
                    name,
                    email,
                    password,
                });

                return reply.code(201).send(result);
            } catch (err: any) {
                return reply.code(400).send({ error: err.message });
            }
        },

        deleteUser: async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                const { id } = req.params as { id: string };
                const result = await service.deleteUser(id);
                return reply.send(result);
            } catch (err: any) {
                return reply.code(400).send({ error: err.message });
            }
        }
    };
}
