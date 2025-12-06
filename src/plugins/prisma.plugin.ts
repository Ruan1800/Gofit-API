import fp from 'fastify-plugin';
import { prisma } from '../infra/database/prisma';

export default fp(async (app) => {
  app.decorate('prisma', prisma);

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
});
