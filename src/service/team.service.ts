import { FastifyInstance } from 'fastify';
import { NotFoundException, ConflictException } from '../core/errors/http.exception';
import { teamRepository } from '../repository/team.repository';

export function teamService(app: FastifyInstance) {
  const repo = teamRepository(app);

  return {
    getTeams: async () => {
      return await repo.findAll();
    },

    getTeamById: async (id: string) => {
      const team = await repo.findById(id);
      if (!team) throw new NotFoundException('Time não encontrado');
      return team;
    },

    getTeamByName: async (name: string) => {
      const team = await repo.findByName(name);
      return team;
    },

    createTeam: async (input: { name: string; members?: string[] }) => {
      const exists = await repo.findByName(input.name);
      if (exists) throw new ConflictException('Nome do time já está em uso');

      const team = await repo.create({
        name: input.name,
      });

      
      if (input.members && input.members.length > 0) {
        for (const memberId of input.members) {
          await repo.addMember(team.id, memberId);
        }
      }
      return team;
    },

    addMember: async (teamId: string, userId: string) => {
      const team = await repo.findById(teamId);
      if (!team) throw new NotFoundException('Time não encontrado');
      return await repo.addMember(teamId, userId);
    },

    deleteTeam: async (id: string) => {
      const team = await repo.findById(id);
      if (!team) throw new NotFoundException('Time não encontrado');
      await repo.delete(id);
      return { message: 'Time deletado com sucesso' };
    },
  };
}