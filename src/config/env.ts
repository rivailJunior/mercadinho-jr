import { z } from 'zod';
/**
 * Your .env variables will be parsed here
 */
const envSchema = z.object({
  WELCOME_MESSAGE: z.string().min(1),
  BASE_URL: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
});

export const env = envSchema.parse({
  WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
  BASE_URL: process.env.BASE_URL,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
});
