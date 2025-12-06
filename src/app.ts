import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma.plugin';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.routes';

export function buildApp() {
  const app = Fastify();

  //plugins
  app.register(prismaPlugin);

  //routes
  app.register(userRoutes, { prefix: '/api' }); // ajustar esse prefixo
  app.register(authRoutes, { prefix: "/api" }); // ajustar esse prefixo

  return app;
}
