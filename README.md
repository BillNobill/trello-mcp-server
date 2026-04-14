# 🚀 Trello MCP Server

This project provides a **Model Context Protocol (MCP)** server for **Trello**, allowing AI agents (like Gemini CLI, Claude Desktop, etc.) to interact directly with your Trello boards, lists, and cards.

## 📋 Prerequisites
- **Node.js** (v18+)
- **Trello API Key and Token** (Get them at [Trello Power-Ups Admin](https://trello.com/power-ups/admin))

## 🛠️ Quick Start

### 1. Installation
```powershell
# Clone the repository
git clone https://github.com/your-username/trello-mcp-server.git
cd trello-mcp-server/trello-mcp-server-local

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Configuration
Create a `.env` file in the root of the `trello-mcp-server-local` folder (use `.env.example` as a template):
```env
TRELLO_API_KEY=your_api_key
TRELLO_TOKEN=your_token
TRELLO_BASE_URL=https://api.trello.com/1
```

### 3. Register with Gemini CLI (Optional)
To use this server with Gemini CLI, add it to your configuration:
```powershell
gemini mcp add trello --command "node" --args "C:\path\to\trello-mcp-server-local\dist\index.js"
```

---

## ⚡ Available Tools

The server exposes the following capabilities to the AI:
- `list_boards`: List all your Trello boards.
- `read_board`: Get lists and cards from a specific board.
- `create_card`: Create new cards with labels, dates, and members.
- `move_card`: Move cards between lists.
- `add_comment`: Add comments to existing cards.
- `archive_card/list`: Cleanup your workspace.
- ... and more!

## 📂 Project Structure
- `trello-mcp-server-local/`: The core TypeScript MCP server implementation.
- `dist/`: Compiled JavaScript (after running `npm run build`).

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
Created by [Luiz Henrique Zavatini Feltrin](https://www.linkedin.com/in/luiz-henrique-zavatini-feltrin/)
