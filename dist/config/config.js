import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Carrega o .env da pasta pai (raiz do projeto)
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
export const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
export const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
export const TRELLO_BASE_URL = process.env.TRELLO_BASE_URL;
console.error("Tentando carregar .env de:", path.resolve(__dirname, "../../../.env"));
console.error("Loaded env:", {
    TRELLO_API_KEY: TRELLO_API_KEY ? "***SET***" : "NOT SET",
    TRELLO_TOKEN: TRELLO_TOKEN ? "***SET***" : "NOT SET",
    TRELLO_BASE_URL,
});
// Validate required environment variables
if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
    console.error("Missing required environment variables: TRELLO_API_KEY and TRELLO_TOKEN");
    console.error("Make sure you have a .env file in your project root with these variables");
    process.exit(1);
}
