# 🚀 Trello MCP Server: AI-Powered Project Management

Transform your Trello boards into a living workspace for AI agents. This **Model Context Protocol (MCP)** server allows LLMs (like Gemini, Claude, and GPT-4) to see, organize, and manage your projects with natural language.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Step 1: Get Your Trello Credentials](#step-1-get-your-trello-credentials)
- [Step 2: Installation & Build](#step-2-installation--build)
- [Step 3: Configuration](#step-3-configuration)
- [Step 4: Integrating with AI Agents](#step-4-integrating-with-ai-agents)
- [Available Tools](#-available-tools)
- [Docker Support](#-docker-support)
- [License](#-license)

---

## 🔍 Overview
This project bridges the gap between AI and your Trello workflow. Instead of manually moving cards, you can tell your AI: *"Move all 'To Do' cards with the 'Urgent' label to 'In Progress' and assign them to me."*

**Where can it be saved?** 
You can save this project anywhere on your computer. Once the path is registered in your AI client (like Gemini CLI or Claude Desktop), the server runs "globally" for that application.

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

---

## Step 1: Get Your Trello Credentials
To talk to Trello, the AI needs an **API Key** and a **Token**.

1. **Get your API Key:**
   - Go to the [Trello Power-Ups Admin](https://trello.com/app-key).
   - Log in and accept the terms.
   - Copy the **API Key** shown at the top.

2. **Generate your Token:**
   - On the same page, click the **"Token"** link (right next to the API Key).
   - Click **Allow** to give the server permission to manage your boards.
   - Copy the long string (this is your **Token**).

---

## Step 2: Installation & Build

Open your terminal (PowerShell or Bash) and run:

```powershell
# 1. Clone the repository
git clone https://github.com/BillNobill/trello-mcp-server.git
cd trello-mcp-server

# 2. Install dependencies
npm install

# 3. Build the project (Convert TypeScript to JavaScript)
npm run build
```

---

## Step 3: Configuration

1. In the project root folder, create a file named `.env`.
2. Open it and paste your credentials:

```env
TRELLO_API_KEY=your_copied_api_key_here
TRELLO_TOKEN=your_copied_token_here
TRELLO_BASE_URL=https://api.trello.com/1
```

---

## Step 4: Integrating with AI Agents

### For Gemini CLI (Recommended)
Add the server globally to your Gemini configuration:
```powershell
gemini mcp add trello --command "node" --args "C:\FULL_PATH\TO\trello-mcp-server\dist\index.js"
```
*Note: Use the absolute path to the `dist/index.js` file.*

### For VS Code with GitHub Copilot Chat
Add the following to your VS Code `settings.json`:
```json
{
  "mcp": {
    "servers": {
      "trello-mcp": {
        "command": "node",
        "args": ["C:/FULL_PATH/TO/trello-mcp-server/dist/index.js"],
        "env": {
          "TRELLO_API_KEY": "your_api_key",
          "TRELLO_TOKEN": "your_token",
          "TRELLO_BASE_URL": "https://api.trello.com/1"
        }
      }
    }
  }
}
```

---

## 🛠️ Troubleshooting

### Server Not Connecting?
1. **Check Credentials:** Ensure `TRELLO_API_KEY` and `TRELLO_TOKEN` are correct in your `.env` or config file.
2. **Absolute Paths:** AI agents require **absolute paths** to the `dist/index.js` file.
3. **Build the Project:** Run `npm run build` after any code changes.
4. **Node Version:** Ensure you are using Node.js v18 or higher (`node -v`).
5. **Restart Client:** Restart Gemini CLI, Claude Desktop, or VS Code after changing the configuration.

### Tools Not Working?
- Verify that you have write permissions to the Trello board.
- Check if the Board/List IDs are correct by using the `list_boards` tool first.

---

## ⚡ Available Tools

Your AI agent will automatically "learn" these commands:
- `list_boards`: See all your available boards.
- `read_board`: Analyze lists and cards (including labels and due dates).
- `create_card`: Create new tasks instantly.
- `move_card`: Change task status across lists.
- `add_comment`: Discuss tasks through the AI.
- `archive_card`: Cleanup completed tasks.
- `get_board_members`: List IDs of everyone on the board.

---

## 🐳 Docker Support

For those who prefer containerized environments, you can run the Trello MCP Server using Docker. This avoids the need to install Node.js locally.

### 1. Build the Docker Image
From the project root, run:
```powershell
docker build -t trello-mcp-server .
```

### 2. Run the Container
You can pass your Trello credentials directly as environment variables:
```powershell
docker run --rm -i `
  -e TRELLO_API_KEY=your_api_key `
  -e TRELLO_TOKEN=your_token `
  -e TRELLO_BASE_URL=https://api.trello.com/1 `
  trello-mcp-server
```

### 3. Using an `.env` file with Docker
If you already have a `.env` file configured:
```powershell
docker run --rm -i --env-file .env trello-mcp-server
```

---

## 🤝 Contributing
Found a bug? Have a feature request?
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---
**Created by [Luiz Henrique Zavatini Feltrin](https://www.linkedin.com/in/luiz-henrique-zavatini-feltrin/)**  
*Show some love! Give this repository a ⭐️ if it helped you!*
