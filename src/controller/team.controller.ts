import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { teamService } from '../service/team.service';
import { createTeamSchema, CreateTeamDTO } from '../schemas/team.schema';
import { validateDTO } from '../utils/validateDTO';

export function teamController(app: FastifyInstance) {
  const service = teamService(app);

  return {
    getTeams: async (req: FastifyRequest, reply: FastifyReply) => {
      const teams = await service.getTeams();
      return reply.send(teams);
    },

    getTeamById: async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string };
      const result = await service.getTeamById(id);
      return reply.send(result);
    },

    getTeamByName: async (req: FastifyRequest, reply: FastifyReply) => {
      const { name } = req.params as { name: string };
      const team = await service.getTeamByName(name);
      return reply.send(team);
    },

    createTeam: async (req: FastifyRequest, reply: FastifyReply) => {
      const parsed: CreateTeamDTO = validateDTO(createTeamSchema)(req, reply);
      const result = await service.createTeam(parsed);
      return reply.code(201).send(result);
    },

    addMember: async (req: FastifyRequest, reply: FastifyReply) => {
      const { teamId } = req.params as { teamId: string };
      const { userId } = req.body as { userId: string };
      const result = await service.addMember(teamId, userId);
      return reply.send(result);
    },

    deleteTeam: async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string };
      const result = await service.deleteTeam(id);
      return reply.send(result);
    },
  };
}