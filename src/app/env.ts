import 'reflect-metadata';
import 'dotenv/config';

// import dotenv from 'dotenv'
import { z } from 'zod';

// dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
// dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' })

const envVars = z.object({
  PORT: z.string().default('5000'),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
});

envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
