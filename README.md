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
gemini mcp add trello node "C:\FULL_PATH\TO\trello-mcp-server\dist\index.js" --scope user --trust
```

> [!IMPORTANT]
> Always use the **absolute path** to `dist/index.js` in the command above.

---

## ⚡ Available Tools

Your AI agent will automatically "learn" these advanced capabilities:

### 📋 Board & List Management
- `list_boards`: List all your Trello boards.
- `read_board`: Deep dive into lists, cards, labels, and members.
- `create_list` / `archive_list`: Organize your board structure.
- `get_board_labels` / `get_board_members`: Fetch IDs for precise automation.

### 🗂️ Card Operations
- `create_card`: Create tasks with descriptions, labels, and due dates.
- `update_card`: Modify existing cards (name, desc, dates, labels).
- `move_card`: Change task status across lists.
- `archive_card`: Cleanup completed work.

### 👥 Collaboration & Details
- `assign_member`: Assign teammates to specific cards.
- `add_checklist`: Create **checklists (selection boxes)** with multiple items.
- `add_attachment`: Attach documentation or relevant links to cards.
- `add_comment`: Discuss tasks directly through the AI.

---

## 🛠️ Troubleshooting

> [!WARNING]
> **Server shows as "Disconnected"?**
> 1. **Empty Command:** If `/mcp list` shows a red dot, ensure your `settings.json` (at `C:\Users\YourUser\.gemini\settings.json`) has `"command": "node"` correctly set.
> 2. **Environment Variables:** Run `node dist/index.js` manually. If it fails, your `.env` is likely missing from the root folder.
> 3. **SDK Compatibility:** This project uses `@modelcontextprotocol/sdk` v1.29.0. If you experience protocol errors, run `npm install` to ensure you have the latest version.

---

## 🐳 Docker Support

> [!TIP]
> Docker is perfect for keeping your local environment clean.

```powershell
# Build
docker build -t trello-mcp-server .

# Run
docker run --rm -i --env-file .env trello-mcp-server
```

---

## 🤝 Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

**Created by [Luiz Feltrin]**  
*Show some love! Give this repository a ⭐️ if it helped you!*
