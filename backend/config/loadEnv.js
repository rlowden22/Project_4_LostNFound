import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let envLoaded = false;

export function loadEnv() {
  if (envLoaded) {
    return;
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const envPaths = [
    path.join(__dirname, "../../.env"),
    path.join(__dirname, "../.env"),
    path.join(__dirname, ".env"),
  ];

  const envPath = envPaths.find((candidate) => fs.existsSync(candidate));
  if (envPath) {
    dotenv.config({ path: envPath });
  } else {
    dotenv.config();
  }

  envLoaded = true;
}
