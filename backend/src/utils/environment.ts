/* eslint-disable no-console */
import { config } from "dotenv";
import { z } from "zod";

config();

const zRequired = () => z.string().min(1);

const envSchema = z.object({
  PORT: zRequired(),
  DATABASE_USER: zRequired(),
  DATABASE_PASSWORD: zRequired(),
  DATABASE_ENDPOINT: zRequired(),
  DATABASE_TABLE: zRequired(),
  EMAIL_PASSWORD: zRequired(),
  EMAIL_ADDRESS: zRequired(),
});
let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Invalid environment configuration:", error.errors);
  } else {
    console.error("Unexpected error:", error);
  }
  process.exit(1);
}

export const {
  PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_ENDPOINT,
  DATABASE_TABLE,
  EMAIL_PASSWORD,
  EMAIL_ADDRESS,
} = env;
