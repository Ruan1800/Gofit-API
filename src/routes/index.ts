import { FastifyInstance } from "fastify";

export default async function routes(app: FastifyInstance) {
  app.get("/", async () => ({
    message: "CopiFit API (TypeScript) is running 🚀",
  }));
}
