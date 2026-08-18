import dotenv from "dotenv";

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongodbUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/qflow"),
  jwtSecret: required("JWT_SECRET", "development_secret_change_me"),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  aiServiceUrl: process.env.AI_SERVICE_URL ?? "http://127.0.0.1:8000"
};
