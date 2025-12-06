import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma.plugin';

import userRoutes from './modules/user/user.route';
import authRoutes from './modules/auth/auth.routes';

export function buildApp() {
  const app = Fastify();

  //plugins
  app.register(prismaPlugin);

  //routes
  app.register(userRoutes, { prefix: '/api' }); // ajustar esse prefixo
  app.register(authRoutes, { prefix: "/api" }); // ajustar esse prefixo

  return app;
}
