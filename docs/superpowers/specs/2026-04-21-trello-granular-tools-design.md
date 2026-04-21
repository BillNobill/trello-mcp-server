# Design Spec: Granular Trello MCP Tools

**Date:** 2026-04-21
**Status:** Draft
**Topic:** Improving performance and reducing context usage through granular Trello tools and lazy-loading.

## 1. Problem Statement
The current `read_board` tool returns the entire state of a Trello board, including all lists, cards, and metadata. This results in:
- **Context Bloat:** Large amounts of irrelevant data (e.g., past sprint lists) consume excessive tokens.
- **Performance Degradation:** Large boards take longer to fetch and process.
- **Cost:** High token usage for both input and output.
- **Model Confusion:** Too much "noise" from inactive cards makes it harder for the model to focus on the current sprint.

## 2. Proposed Solution: Hybrid Granularity
Implement a "Lazy Loading" pattern where the model first explores the board structure and then fetches specific data. Additionally, provide targeted tools for common queries (filters by member, date, and search).

### 2.1 Navigation Flow (Lazy Loading)
1. `get_lists_on_board`: Fetch only the column names and IDs.
2. `get_cards_in_list`: Fetch all cards for a specific active column identified in step 1.

### 2.2 Direct Query Tools (Filtros)
Dedicated tools for specific business needs like reporting, workload analysis, and specific card inspection.

## 3. Tool Specifications

### 3.1 `get_lists_on_board`
- **Purpose:** Lists only the names and IDs of the columns on a board.
- **Input:** `boardId` (string)
- **Output:** Array of objects `{ id, name }`.

### 3.2 `get_cards_in_list`
- **Purpose:** Retrieves all cards within a specific list.
- **Input:** `listId` (string)
- **Output:** Array of card objects (id, name, desc, members, labels, etc.).

### 3.3 `get_cards_by_date`
- **Purpose:** Filters cards by creation or due date across the entire board.
- **Input:** 
  - `boardId` (string)
  - `since` (ISO date string, optional)
  - `before` (ISO date string, optional)
- **Output:** Array of matching cards.

### 3.4 `get_member_workload`
- **Purpose:** Finds all cards assigned to a specific member on a board.
- **Input:** 
  - `boardId` (string)
  - `memberId` (string)
- **Output:** Array of cards assigned to that member.

### 3.5 `get_card_details`
- **Purpose:** Fetches full details for a single card (comments, attachments, checklists).
- **Input:** `cardId` (string)
- **Output:** Deep object containing all card information.

### 3.6 `search_cards`
- **Purpose:** Performs a text-based search on the board.
- **Input:** 
  - `boardId` (string)
  - `query` (string)
- **Output:** Array of matching cards.

### 3.7 `get_board_members`
- **Purpose:** Lists all members of a board to obtain their IDs.
- **Input:** `boardId` (string)
- **Output:** Array of `{ id, fullName, username }`.

## 4. Architectural Changes

### 4.1 `src/api/trelloApi.ts`
- Add generic `get` methods that support query parameters like `idList`, `idMembers`, and `since`.
- Add helper methods for card details (actions, checklists).

### 4.2 `src/metadata/toolsMetadata.ts`
- Register the new tool definitions with clear descriptions and JSON Schemas.

### 4.3 `src/handlers/toolHandlers.ts`
- Implement handler logic for each tool, mapping them to the new `TrelloApi` methods.

## 5. Backward Compatibility
The existing `read_board` tool remains unchanged as a fallback option for global context analysis.

## 6. Testing Strategy
- **Unit Tests:** Verify each tool handler correctly formats parameters for the Trello API.
- **Integration Tests:** Use a test board to verify that filters (list, member, date) return the expected subset of cards.
- **Token Usage Audit:** Compare token count between `read_board` and the new granular flow for a typical "What is my workload today?" query.
