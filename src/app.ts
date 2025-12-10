import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma.plugin';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import teamRoutes from './routes/team.routes';

import { registerErrorHandler } from './core/errors/app.error';

export function buildApp() {
  const app = Fastify();

  //error handler
  registerErrorHandler(app);

  //plugins
  app.register(prismaPlugin);

  //routes
  app.register(userRoutes, { prefix: '/users' });
  app.register(authRoutes, { prefix: '/auth' });
  app.register(teamRoutes, { prefix: '/teams' });

  return app;
}
