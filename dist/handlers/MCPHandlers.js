import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { TrelloApi } from "../api/trelloApi.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { TRELLO_API_KEY, TRELLO_BASE_URL, TRELLO_TOKEN, } from "../config/config.js";
import { createToolHandlers } from "./toolHandlers.js";
import { toolsMetadata } from "../metadata/toolsMetadata.js";
const trello = new TrelloApi(TRELLO_API_KEY ?? "", TRELLO_TOKEN ?? "", TRELLO_BASE_URL);
const toolHandlers = createToolHandlers(trello);
export const mcpServer = new Server({
    name: "trello-mcp-server",
    version: "1.0.0",
});
mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => {
    try {
        const boards = await trello.get("/members/me/boards", {
            fields: "id,name,closed",
        });
        const openBoards = boards.filter((b) => !b.closed);
        return {
            resources: openBoards.map((board) => ({
                uri: `board:${board.id}`,
                name: board.name,
                description: `Trello board: ${board.name}`,
                mimeType: "application/json",
            })),
        };
    }
    catch (error) {
        console.error("Error fetching boards:", error);
        return {
            resources: [],
        };
    }
});
mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const resourceId = request.params.uri;
    if (!resourceId.startsWith("board:")) {
        throw new Error("Only board resources are supported");
    }
    const boardId = resourceId.split(":")[1];
    try {
        const lists = await trello.get(`/boards/${boardId}/lists`, {
            fields: "id,name,closed",
        });
        const openLists = lists.filter((list) => !list.closed);
        const listWithCards = await Promise.all(openLists.map(async (list) => {
            const cards = await trello.get(`/lists/${list.id}/cards`, {
                fields: "id,name,closed",
            });
            const openCards = cards.filter((card) => !card.closed);
            return {
                listId: list.id,
                listName: list.name,
                cards: openCards.map((card) => ({
                    id: card.id,
                    name: card.name,
                    description: `Trello card: ${card.name} in list ${list.name}`,
                })),
            };
        }));
        return {
            contents: [
                {
                    uri: resourceId,
                    mimeType: "application/json",
                    text: JSON.stringify({
                        boardId,
                        lists: listWithCards,
                    }, null, 2),
                },
            ],
        };
    }
    catch (error) {
        console.error("Error reading board:", error);
        throw error;
    }
});
mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        let result;
        switch (name) {
            case "list_boards":
                result = await toolHandlers.handleListBoards();
                break;
            case "read_board":
                result = await toolHandlers.handleReadBoard(args);
                break;
            case "get_board_labels":
                result = await toolHandlers.handleGetBoardLabels(args);
                break;
            case "get_board_members":
                result = await toolHandlers.handleGetBoardMembers(args);
                break;
            case "create_list":
                result = await toolHandlers.handleCreateList(args);
                break;
            case "create_card":
                result = await toolHandlers.handleCreateCard(args);
                break;
            case "assign_member":
                result = await toolHandlers.handleAssignMember(args);
                break;
            case "add_checklist":
                result = await toolHandlers.handleAddChecklist(args);
                break;
            case "add_attachment":
                result = await toolHandlers.handleAddAttachment(args);
                break;
            case "move_card":
                result = await toolHandlers.handleMoveCard(args);
                break;
            case "add_comment":
                result = await toolHandlers.handleAddComment(args);
                break;
            case "archive_card":
                result = await toolHandlers.handleArchiveCard(args);
                break;
            case "archive_list":
                result = await toolHandlers.handleArchiveList(args);
                break;
            case "delete_board":
                result = await toolHandlers.handleDeleteBoard(args);
                break;
            case "update_list_name":
                result = await toolHandlers.handleUpdateListName(args);
                break;
            case "update_card":
                result = await toolHandlers.handleUpdateCard(args);
                break;
            case "update_card_name":
                result = await toolHandlers.handleUpdateCardName(args);
                break;
            default:
                throw new Error(`Tool "${name}" is not implemented`);
        }
        return result;
    }
    catch (e) {
        console.error(`Error in tool handler for ${name}:`, e);
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${typeof e === "object" && e !== null && "message" in e
                        ? e.message
                        : String(e)}`,
                },
            ],
        };
    }
});
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: toolsMetadata,
    };
});
