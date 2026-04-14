import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the project root directory (two levels up from src/config or dist/config)
const projectRoot = path.resolve(__dirname, "../../");

// Load .env using an absolute path to the project root
dotenv.config({ path: path.join(projectRoot, ".env") });

export const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
export const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
export const TRELLO_BASE_URL = process.env.TRELLO_BASE_URL;

if (process.env.NODE_ENV !== "production") {
  console.error("Attempting to load .env from:", path.join(projectRoot, ".env"));
}
console.error("Loaded env:", {
  TRELLO_API_KEY: TRELLO_API_KEY ? "***SET***" : "NOT SET",
  TRELLO_TOKEN: TRELLO_TOKEN ? "***SET***" : "NOT SET",
  TRELLO_BASE_URL,
});

// Validate required environment variables
if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
  console.error(
    "Missing required environment variables: TRELLO_API_KEY and TRELLO_TOKEN"
  );
  console.error(
    "Make sure you have a .env file in your project root with these variables"
  );
  process.exit(1);
}
