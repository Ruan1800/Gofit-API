import { FastifyInstance } from 'fastify';

export function userRepository(app: FastifyInstance) {
    return {
        findAll: async () => {
            return await app.prisma.user.findMany();
        },

        findById: async (id: string) => {
            return await app.prisma.user.findUnique({
                where: { id },
            });
        },

        findByName: async (name: string) => {
            return await app.prisma.user.findFirst({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive"
                    }
                }
            });
        },

        findByEmail: async (email: string) => {
            return await app.prisma.user.findUnique({
                where: { email },
            });
        },

        create: async (data: any) => { // Adjust 'any' to your User type if available
            return await app.prisma.user.create({ data });
        },

        delete: async (id: string) => {
            return await app.prisma.user.delete({
                where: { id },
            });
        }
    };
}
