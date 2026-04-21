# Granular Trello Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement granular Trello tools to reduce context usage and improve performance by allowing the model to fetch only necessary data.

**Architecture:** We will add 7 new tools to the MCP server. These tools will leverage the existing `TrelloApi` class and follow the established pattern of metadata definition in `toolsMetadata.ts` and handler implementation in `toolHandlers.ts`.

**Tech Stack:** TypeScript, MCP SDK, Axios (for Trello API).

---

### Task 1: Define New Tool Metadata

**Files:**
- Modify: `src/metadata/toolsMetadata.ts`

- [ ] **Step 1: Add new tool definitions to `toolsMetadata` array**

```typescript
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
```

- [ ] **Step 2: Commit metadata changes**

```bash
git add src/metadata/toolsMetadata.ts
git commit -m "feat: add metadata for granular trello tools"
```

---

### Task 2: Update MCP Request Handler

**Files:**
- Modify: `src/handlers/MCPHandlers.ts`

- [ ] **Step 1: Add new cases to the `CallToolRequestSchema` switch statement**

```typescript
      case "get_lists_on_board":
        result = await toolHandlers.handleGetListsOnBoard(args);
        break;
      case "get_cards_in_list":
        result = await toolHandlers.handleGetCardsInList(args);
        break;
      case "get_cards_by_date":
        result = await toolHandlers.handleGetCardsByDate(args);
        break;
      case "get_member_workload":
        result = await toolHandlers.handleGetMemberWorkload(args);
        break;
      case "get_card_details":
        result = await toolHandlers.handleGetCardDetails(args);
        break;
      case "search_cards":
        result = await toolHandlers.handleSearchCards(args);
        break;
```

- [ ] **Step 2: Commit MCP handler changes**

```bash
git add src/handlers/MCPHandlers.ts
git commit -m "feat: register new granular tool handlers in MCP server"
```

---

### Task 3: Implement Tool Handlers

**Files:**
- Modify: `src/handlers/toolHandlers.ts`

- [ ] **Step 1: Implement `handleGetListsOnBoard` and `handleGetCardsInList`**

```typescript
    async handleGetListsOnBoard(args: any) {
      try {
        const { boardId } = args;
        const lists = await trello.get(`/boards/${boardId}/lists`, { fields: "id,name,closed" });
        return { content: [{ type: "text", text: JSON.stringify(lists.filter((l: any) => !l.closed).map((l: any) => ({ id: l.id, name: l.name })), null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleGetCardsInList(args: any) {
      try {
        const { listId } = args;
        const cards = await trello.get(`/lists/${listId}/cards`, { fields: "id,name,closed,labels,idMembers,desc,due,start" });
        return { content: [{ type: "text", text: JSON.stringify(cards.filter((c: any) => !c.closed).map((card: any) => ({
          id: card.id,
          name: card.name,
          description: card.desc,
          labels: card.labels.map((l: any) => ({ id: l.id, name: l.name, color: l.color })),
          members: card.idMembers,
          due: card.due,
          start: card.start,
        })), null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },
```

- [ ] **Step 2: Implement `handleGetCardsByDate` and `handleGetMemberWorkload`**

```typescript
    async handleGetCardsByDate(args: any) {
      try {
        const { boardId, since, before } = args;
        const params: any = { fields: "id,name,closed,labels,idMembers,desc,due,start" };
        if (since) params.since = since;
        if (before) params.before = before;
        const cards = await trello.get(`/boards/${boardId}/cards`, params);
        return { content: [{ type: "text", text: JSON.stringify(cards.filter((c: any) => !c.closed).map((card: any) => ({
          id: card.id,
          name: card.name,
          description: card.desc,
          labels: card.labels.map((l: any) => ({ id: l.id, name: l.name, color: l.color })),
          members: card.idMembers,
          due: card.due,
          start: card.start,
        })), null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleGetMemberWorkload(args: any) {
      try {
        const { boardId, memberId } = args;
        const cards = await trello.get(`/boards/${boardId}/cards`, { fields: "id,name,closed,labels,idMembers,desc,due,start" });
        const memberCards = cards.filter((c: any) => !c.closed && c.idMembers.includes(memberId));
        return { content: [{ type: "text", text: JSON.stringify(memberCards.map((card: any) => ({
          id: card.id,
          name: card.name,
          description: card.desc,
          labels: card.labels.map((l: any) => ({ id: l.id, name: l.name, color: l.color })),
          members: card.idMembers,
          due: card.due,
          start: card.start,
        })), null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },
```

- [ ] **Step 3: Implement `handleGetCardDetails` and `handleSearchCards`**

```typescript
    async handleGetCardDetails(args: any) {
      try {
        const { cardId } = args;
        const card = await trello.get(`/cards/${cardId}`, { 
          fields: "all",
          actions: "commentCard",
          attachments: "true",
          checklists: "all"
        });
        return { content: [{ type: "text", text: JSON.stringify(card, null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleSearchCards(args: any) {
      try {
        const { boardId, query } = args;
        // Trello search API is global, so we filter by boardId in results if needed, 
        // but often 'idBoards' param works in search.
        const results = await trello.get("/search", { query, idBoards: boardId, modelTypes: "cards", card_fields: "id,name,closed,labels,idMembers,desc,due,start" });
        return { content: [{ type: "text", text: JSON.stringify(results.cards.filter((c: any) => !c.closed), null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },
```

- [ ] **Step 4: Commit handler implementations**

```bash
git add src/handlers/toolHandlers.ts
git commit -m "feat: implement granular trello tool handlers"
```

---

### Task 4: Verification

- [ ] **Step 1: Build the project to ensure no type errors**

Run: `npm run build` (or `tsc` if no build script)
Expected: No errors.

- [ ] **Step 2: Manual verification (Optional/Simulated)**
Since we don't have a live Trello board to test against in this environment, ensure all methods match the Trello API documentation and use the `trello.get` helper correctly.
