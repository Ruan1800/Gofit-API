import { ZodError, ZodIssue } from 'zod';

export function formatZodError(err: ZodError<any>) {
  return err.issues.map((e: ZodIssue) => ({
    field: e.path.join('.'),
    message: e.message,
  }));
}
