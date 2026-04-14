# 🚀 Trello MCP Server: AI-Powered Project Management

Transform your Trello boards into a living workspace for AI agents. This **Model Context Protocol (MCP)** server allows LLMs (like Gemini, Claude, and GPT-4) to see, organize, and manage your projects with natural language.

---

## 🔍 Overview
This project bridges the gap between AI and your Trello workflow. Instead of manually moving cards, you can tell your AI: *"Move all 'To Do' cards with the 'Urgent' label to 'In Progress' and assign them to me."*

**Global Usage:** You can save this project anywhere on your computer. Once registered, your AI will be able to start the server automatically whenever needed—no manual terminal execution required.

---

## 📋 Prerequisites
- **Node.js** (v20.0.0 or higher recommended) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Trello API Key and Token**: [Get them here](https://trello.com/app-key)

---

## 🛠️ Quick Start

### 1. Installation & Build
```powershell
# Clone the repository
git clone https://github.com/BillNobill/trello-mcp-server.git
cd trello-mcp-server

# Install dependencies and build
npm install
npm run build
```

### 2. Configuration
Create a `.env` file in the project root (use `.env.example` as a template):
```env
TRELLO_API_KEY=your_api_key
TRELLO_TOKEN=your_token
TRELLO_BASE_URL=https://api.trello.com/1
```

### 3. Register with Gemini CLI (Global)
To use this server anywhere on your computer, register it with the user scope:
```powershell
gemini mcp add trello --command "node" --args "C:\FULL_PATH\TO\trello-mcp-server\dist\index.js" --scope user --trust
```
*Note: Always use the absolute path to `dist/index.js`.*

---

## 🛠️ Troubleshooting & Common Issues

### 🔴 Server shows as "Disconnected"?
If `/mcp list` shows a red dot, check your global settings:
1. **Empty Command:** Sometimes the CLI might fail to save the command. Open your Gemini settings (usually at `C:\Users\YourUser\.gemini\settings.json`) and ensure `"command": "node"` is set for the trello server.
2. **Path Issues:** Ensure you are pointing to the `dist/index.js` file (not the `.ts` one).
3. **Environment Variables:** Run `node dist/index.js` manually in your terminal. If it says "Missing environment variables", your `.env` file is in the wrong place or missing.

### 🐳 Running with Docker
```powershell
docker build -t trello-mcp-server .
docker run --rm -i --env-file .env trello-mcp-server
```

---

## ⚡ Available Tools
- `list_boards`: See all your available boards.
- `read_board`: Analyze lists and cards (including labels and due dates).
- `create_card`: Create new tasks instantly.
- `move_card`: Change task status across lists.
- `add_comment`: Discuss tasks through the AI.

---

## 🤝 Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

**Created by [Luiz Henrique Zavatini Feltrin](https://www.linkedin.com/in/luiz-henrique-zavatini-feltrin/)**  
*Show some love! Give this repository a ⭐️ if it helped you!*
