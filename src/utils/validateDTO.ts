import { z, ZodSchema } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { BadRequestException } from '../core/errors/http.exception';
import { formatZodError } from './formatZodError';

export function validateDTO<T>(schema: ZodSchema<T>) {
  return (req: FastifyRequest, reply: FastifyReply): T => {
    try {
      return schema.parse(req.body);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException('Validation failed', formatZodError(err));
      }
      throw new BadRequestException(err.message);
    }
  };
}
