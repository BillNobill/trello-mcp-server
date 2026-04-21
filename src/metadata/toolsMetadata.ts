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
    description: "Add a checklist to a card",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "ID of the card",
        },
        name: {
          type: "string",
          description: "Name of the checklist",
        },
        items: {
          type: "string",
          description: "Comma-separated list of items for the checklist (optional)",
        },
      },
      required: ["cardId", "name"],
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
    description: "Move a card to a different list",
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
    name: "update_list_name",
    description: "Update a list name",
    inputSchema: {
      type: "object",
      properties: {
        listId: {
          type: "string",
          description: "ID of the list to be updated",
        },
        name: {
          type: "string",
          description: "New name of the card",
        },
      },
      required: ["listId", "name"],
    },
  },
  {
    name: "update_card",
    description: "Update card details (name, description, labels, dates)",
    inputSchema: {
      type: "object",
      properties: {
        cardId: { type: "string", description: "ID of the card to update" },
        name: { type: "string", description: "New name of the card" },
        desc: { type: "string", description: "New description" },
        idLabels: { type: "string", description: "Comma-separated label IDs" },
        due: { type: "string", description: "Due date (ISO)" },
        start: { type: "string", description: "Start date (ISO)" },
        idMembers: { type: "string", description: "Comma-separated member IDs" }
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
