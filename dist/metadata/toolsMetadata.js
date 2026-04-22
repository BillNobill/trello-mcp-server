export const toolsMetadata = [
    {
        name: "list_boards",
        description: "List all open Trello boards",
        inputSchema: {
            type: "object",
            properties: {},
            required: [],
        },
    },
    {
        name: "read_board",
        description: "Read lists and cards from a specific board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to read",
                },
            },
            required: ["boardId"],
        },
    },
    {
        name: "get_board_labels",
        description: "Get all labels defined in a board (useful for getting label IDs)",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board",
                },
            },
            required: ["boardId"],
        },
    },
    {
        name: "get_board_members",
        description: "Get all members of a board (useful for getting member IDs)",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board",
                },
            },
            required: ["boardId"],
        },
    },
    {
        name: "create_list",
        description: "Create a new list in a specific board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to create the list in",
                },
                name: {
                    type: "string",
                    description: "Name of the list",
                },
                pos: {
                    type: "string",
                    description: "Position of the list: 'top', 'bottom', or a positive number (optional)",
                },
            },
            required: ["boardId", "name"],
        },
    },
    {
        name: "create_card",
        description: "Create a new card with support for labels, dates and members",
        inputSchema: {
            type: "object",
            properties: {
                listId: {
                    type: "string",
                    description: "ID of the list to create the card in",
                },
                name: {
                    type: "string",
                    description: "Name of the card",
                },
                desc: {
                    type: "string",
                    description: "Description of the card (optional)",
                },
                idLabels: {
                    type: "string",
                    description: "Comma-separated list of label IDs (optional)",
                },
                idMembers: {
                    type: "string",
                    description: "Comma-separated list of member IDs (optional)",
                },
                due: {
                    type: "string",
                    description: "Due date in ISO format (optional)",
                },
                start: {
                    type: "string",
                    description: "Start date in ISO format (optional)",
                },
                pos: {
                    type: "string",
                    description: "Position of the card: 'top', 'bottom', or a positive number (optional)",
                },
            },
            required: ["listId", "name"],
        },
    },
    {
        name: "assign_member",
        description: "Assign a member to an existing card",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card",
                },
                memberId: {
                    type: "string",
                    description: "ID of the member to assign",
                },
            },
            required: ["cardId", "memberId"],
        },
    },
    {
        name: "add_checklist",
        description: "Add a new checklist to a card",
        inputSchema: {
            type: "object",
            properties: {
                cardId: { type: "string", description: "ID of the card" },
                name: { type: "string", description: "Name of the checklist" },
                items: { type: "string", description: "Comma-separated initial items (optional)" },
            },
            required: ["cardId", "name"],
        },
    },
    {
        name: "update_checklist",
        description: "Update a checklist header (rename or move)",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: { type: "string", description: "ID of the checklist" },
                name: { type: "string", description: "New name of the checklist (optional)" },
                pos: { type: "string", description: "New position (optional)" },
            },
            required: ["checklistId"],
        },
    },
    {
        name: "delete_checklist",
        description: "Remove a checklist from a card",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: { type: "string", description: "ID of the checklist to delete" },
            },
            required: ["checklistId"],
        },
    },
    {
        name: "create_checkitem",
        description: "Add a new item to an existing checklist",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: { type: "string", description: "ID of the checklist" },
                name: { type: "string", description: "Name of the item" },
                pos: { type: "string", description: "Position: 'top', 'bottom', or a number (optional)" },
            },
            required: ["checklistId", "name"],
        },
    },
    {
        name: "update_checkitem",
        description: "Update an existing check item (rename, state, or position)",
        inputSchema: {
            type: "object",
            properties: {
                cardId: { type: "string", description: "ID of the card" },
                checkItemId: { type: "string", description: "ID of the item to update" },
                name: { type: "string", description: "New name (optional)" },
                state: { type: "string", enum: ["complete", "incomplete"], description: "State (optional)" },
                pos: { type: "string", description: "New position (optional)" },
            },
            required: ["cardId", "checkItemId"],
        },
    },
    {
        name: "delete_checkitem",
        description: "Remove an item from a checklist",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: { type: "string", description: "ID of the checklist" },
                checkItemId: { type: "string", description: "ID of the item to delete" },
            },
            required: ["checklistId", "checkItemId"],
        },
    },
    {
        name: "add_attachment",
        description: "Add a link attachment to a card (e.g., documentation link)",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card",
                },
                url: {
                    type: "string",
                    description: "URL of the attachment",
                },
                name: {
                    type: "string",
                    description: "Name of the attachment (optional)",
                },
            },
            required: ["cardId", "url"],
        },
    },
    {
        name: "move_card",
        description: "Move a card to a different list and/or position",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to move",
                },
                listId: {
                    type: "string",
                    description: "ID of the target list",
                },
                pos: {
                    type: "string",
                    description: "Position in the target list: 'top', 'bottom', or a positive number (optional)",
                },
            },
            required: ["cardId", "listId"],
        },
    },
    {
        name: "add_comment",
        description: "Add a comment to a card",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to add a comment to",
                },
                text: {
                    type: "string",
                    description: "Comment text",
                },
            },
            required: ["cardId", "text"],
        },
    },
    {
        name: "archive_card",
        description: "Archive a card",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to archive",
                },
            },
            required: ["cardId"],
        },
    },
    {
        name: "archive_list",
        description: "Archive a list",
        inputSchema: {
            type: "object",
            properties: {
                listId: {
                    type: "string",
                    description: "ID of the list to archive",
                },
            },
            required: ["listId"],
        },
    },
    {
        name: "delete_board",
        description: "Delete a board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: {
                    type: "string",
                    description: "ID of the board to delete",
                },
            },
            required: ["boardId"],
        },
    },
    {
        name: "update_list",
        description: "Update list details (name, position)",
        inputSchema: {
            type: "object",
            properties: {
                listId: {
                    type: "string",
                    description: "ID of the list to be updated",
                },
                name: {
                    type: "string",
                    description: "New name of the list (optional)",
                },
                pos: {
                    type: "string",
                    description: "New position of the list: 'top', 'bottom', or a positive number (optional)",
                },
            },
            required: ["listId"],
        },
    },
    {
        name: "update_card",
        description: "Update card details (name, description, labels, dates, position)",
        inputSchema: {
            type: "object",
            properties: {
                cardId: { type: "string", description: "ID of the card to update" },
                name: { type: "string", description: "New name of the card (optional)" },
                desc: { type: "string", description: "New description (optional)" },
                idLabels: { type: "string", description: "Comma-separated label IDs (optional)" },
                due: { type: "string", description: "Due date ISO format (optional)" },
                start: { type: "string", description: "Start date ISO format (optional)" },
                idMembers: { type: "string", description: "Comma-separated member IDs (optional)" },
                pos: { type: "string", description: "New position: 'top', 'bottom', or a positive number (optional)" }
            },
            required: ["cardId"]
        }
    },
    {
        name: "update_card_name",
        description: "Update a card name",
        inputSchema: {
            type: "object",
            properties: {
                cardId: {
                    type: "string",
                    description: "ID of the card to be updated",
                },
                name: {
                    type: "string",
                    description: "New name of the card",
                },
            },
            required: ["cardId", "name"],
        },
    },
    {
        name: "create_label",
        description: "Create a new label on a board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: { type: "string", description: "ID of the board" },
                name: { type: "string", description: "Name of the label" },
                color: {
                    type: "string",
                    description: "Color of the label: yellow, purple, blue, red, green, orange, black, sky, pink, lime, null (for no color)"
                },
            },
            required: ["boardId", "name", "color"],
        },
    },
    {
        name: "update_label",
        description: "Update a label's name or color",
        inputSchema: {
            type: "object",
            properties: {
                labelId: { type: "string", description: "ID of the label to update" },
                name: { type: "string", description: "New name of the label (optional)" },
                color: {
                    type: "string",
                    description: "New color of the label (optional)"
                },
            },
            required: ["labelId"],
        },
    },
    {
        name: "move_all_cards",
        description: "Move all cards from one list to another (Bulk Action)",
        inputSchema: {
            type: "object",
            properties: {
                boardId: { type: "string", description: "ID of the board" },
                idListSource: { type: "string", description: "ID of the current list" },
                idListDest: { type: "string", description: "ID of the destination list" },
            },
            required: ["boardId", "idListSource", "idListDest"],
        },
    },
    {
        name: "upload_file",
        description: "Upload a local file directly to a card as an attachment",
        inputSchema: {
            type: "object",
            properties: {
                cardId: { type: "string", description: "ID of the card" },
                filePath: { type: "string", description: "Absolute local path to the file" },
                name: { type: "string", description: "Optional name for the file" },
            },
            required: ["cardId", "filePath"],
        },
    },
    {
        name: "set_custom_field",
        description: "Set a value for a custom field on a card (Requires Custom Fields Power-Up)",
        inputSchema: {
            type: "object",
            properties: {
                cardId: { type: "string", description: "ID of the card" },
                customFieldId: { type: "string", description: "ID of the custom field" },
                value: { type: "string", description: "Value to set (text, number, date, etc.)" },
            },
            required: ["cardId", "customFieldId", "value"],
        },
    },
    {
        name: "get_lists_on_board",
        description: "Lists only the names and IDs of the columns on a board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: { type: "string", description: "ID of the board" },
            },
            required: ["boardId"],
        },
    },
    {
        name: "get_cards_in_list",
        description: "Retrieves all cards within a specific list",
        inputSchema: {
            type: "object",
            properties: {
                listId: { type: "string", description: "ID of the list" },
            },
            required: ["listId"],
        },
    },
    {
        name: "get_cards_by_date",
        description: "Filters cards by creation or due date across the entire board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: { type: "string", description: "ID of the board" },
                since: { type: "string", description: "ISO date string (optional), filter cards modified after this date" },
                before: { type: "string", description: "ISO date string (optional), filter cards modified before this date" },
            },
            required: ["boardId"],
        },
    },
    {
        name: "get_member_workload",
        description: "Finds all cards assigned to a specific member on a board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: { type: "string", description: "ID of the board" },
                memberId: { type: "string", description: "ID of the member" },
            },
            required: ["boardId", "memberId"],
        },
    },
    {
        name: "get_card_details",
        description: "Fetches full details for a single card (comments, attachments, checklists)",
        inputSchema: {
            type: "object",
            properties: {
                cardId: { type: "string", description: "ID of the card" },
            },
            required: ["cardId"],
        },
    },
    {
        name: "search_cards",
        description: "Performs a text-based search on the board",
        inputSchema: {
            type: "object",
            properties: {
                boardId: { type: "string", description: "ID of the board" },
                query: { type: "string", description: "Search query" },
            },
            required: ["boardId", "query"],
        },
    },
];
