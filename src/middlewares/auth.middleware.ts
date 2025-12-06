import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; email: string };

    (req as any).user = decoded;

  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}
