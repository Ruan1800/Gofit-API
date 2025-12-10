import { FastifyInstance } from "fastify";
import { teamController } from "../controller/team.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export default async function teamRoutes(app: FastifyInstance) {
  const controller = teamController(app);

  app.get('/', controller.getTeams);
  app.get('/:id', controller.getTeamById);
  app.get('/search/:name', controller.getTeamByName);
  app.post('/', controller.createTeam);
  app.post("/:teamId/members", controller.addMember);
  app.delete('/:id', { preHandler: authMiddleware }, controller.deleteTeam);
}
