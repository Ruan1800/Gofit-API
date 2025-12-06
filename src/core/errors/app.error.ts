import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpException } from "./http.exception";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError | HttpException, req: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof HttpException) {
        return reply.status(error.statusCode).send({
          statusCode: error.statusCode,
          error: error.error,
          message: error.message,
        });
      }

      return reply.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Algo deu errado no servidor.",
      });
    }
  );

}
