import { FastifyInstance } from 'fastify';

export function teamRepository(app: FastifyInstance) {
  return {
    findAll: async () => {
      return await app.prisma.team.findMany({
        include: { members: { include: { user: true } } },
      });
    },

    findById: async (id: string) => {
      return await app.prisma.team.findUnique({
        where: { id },
        include: { members: { include: { user: true } } },
      });
    },

    findByName: async (name: string) => {
      return await app.prisma.team.findFirst({
        where: { name: { contains: name, mode: 'insensitive' } },
        include: { members: { include: { user: true } } },
      });
    },

    create: async (data: any) => {
      return await app.prisma.team.create({ data });
    },

    addMember: async (teamId: string, userId: string) => {
      return await app.prisma.teamMember.create({
        data: { teamId, userId },
      });
    },

    delete: async (id: string) => {
      return await app.prisma.team.delete({
        where: { id },
      });
    },
  };
}