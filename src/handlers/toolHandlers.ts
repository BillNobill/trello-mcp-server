import { TrelloApi } from "../api/trelloApi.js";

export function createToolHandlers(trello: TrelloApi) {
  return {
    async handleListBoards() {
      try {
        const boards = await trello.get("/members/me/boards", { fields: "id,name,closed" });
        return { content: [{ type: "text", text: JSON.stringify(boards.filter((b: any) => !b.closed).map((b: any) => ({ id: b.id, name: b.name })), null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleReadBoard(args: any) {
      try {
        const { boardId } = args;
        const lists = await trello.get(`/boards/${boardId}/lists`, { fields: "id,name,closed" });
        const openLists = lists.filter((list: any) => !list.closed);
        const listWithCards = await Promise.all(openLists.map(async (list: any) => {
          const cards = await trello.get(`/lists/${list.id}/cards`, { fields: "id,name,closed,labels,idMembers,desc,due,start" });
          return {
            listId: list.id,
            listName: list.name,
            cards: cards.filter((c: any) => !c.closed).map((card: any) => ({
              id: card.id,
              name: card.name,
              description: card.desc,
              labels: card.labels.map((l: any) => ({ id: l.id, name: l.name, color: l.color })),
              members: card.idMembers,
              due: card.due,
              start: card.start,
            })),
          };
        }));
        return { content: [{ type: "text", text: JSON.stringify(listWithCards, null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleGetBoardLabels(args: any) {
      try {
        const { boardId } = args;
        const labels = await trello.get(`/boards/${boardId}/labels`, { fields: "id,name,color" });
        return { content: [{ type: "text", text: JSON.stringify(labels, null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleGetBoardMembers(args: any) {
      try {
        const { boardId } = args;
        const members = await trello.get(`/boards/${boardId}/members`, { fields: "id,fullName,username" });
        return { content: [{ type: "text", text: JSON.stringify(members, null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleCreateCard(args: any) {
      try {
        const { listId, name, desc, idLabels, idMembers, due, start } = args;
        const card = await trello.post("/cards", { idList: listId, name, desc, idLabels, idMembers, due, start });
        return { content: [{ type: "text", text: JSON.stringify(card, null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleAssignMember(args: any) {
      try {
        const { cardId, memberId } = args;
        await trello.post(`/cards/${cardId}/idMembers`, { value: memberId });
        return { content: [{ type: "text", text: `Member ${memberId} assigned to card ${cardId}.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleAddChecklist(args: any) {
      try {
        const { cardId, name, items } = args;
        const checklist = await trello.post(`/cards/${cardId}/checklists`, { name });
        if (items) {
          for (const item of items.split(",").map((i: string) => i.trim())) {
            await trello.post(`/checklists/${checklist.id}/checkItems`, { name: item });
          }
        }
        return { content: [{ type: "text", text: `Checklist '${name}' added.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleAddAttachment(args: any) {
      try {
        const { cardId, url, name } = args;
        const attachment = await trello.post(`/cards/${cardId}/attachments`, { url, name });
        return { content: [{ type: "text", text: `Attachment added to card ${cardId}: ${attachment.id}` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleCreateList(args: any) {
      try {
        const { boardId, name } = args;
        const list = await trello.post("/lists", { idBoard: boardId, name });
        return { content: [{ type: "text", text: JSON.stringify(list, null, 2) }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleMoveCard(args: any) {
      try {
        const { cardId, listId } = args;
        await trello.put(`/cards/${cardId}`, { idList: listId });
        return { content: [{ type: "text", text: `Card moved to list ${listId}` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleAddComment(args: any) {
      try {
        const { cardId, text } = args;
        await trello.post(`/cards/${cardId}/actions/comments`, { text });
        return { content: [{ type: "text", text: `Comment added to card ${cardId}` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleArchiveCard(args: any) {
      try {
        const { cardId } = args;
        await trello.put(`/cards/${cardId}`, { closed: true });
        return { content: [{ type: "text", text: `Card ${cardId} archived.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleArchiveList(args: any) {
      try {
        const { listId } = args;
        await trello.put(`/lists/${listId}`, { closed: true });
        return { content: [{ type: "text", text: `List ${listId} archived.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleDeleteBoard(args: any) {
      try {
        const { boardId } = args;
        await trello.delete(`/boards/${boardId}`);
        return { content: [{ type: "text", text: `Board ${boardId} deleted.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleUpdateListName(args: any) {
      try {
        const { listId, name } = args;
        await trello.put(`/lists/${listId}`, { name });
        return { content: [{ type: "text", text: `List renamed to ${name}.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleUpdateCard(args: any) {
      try {
        const { cardId, name, desc, idLabels, due, start, idMembers } = args;
        const updateData: any = {};
        if (name) updateData.name = name;
        if (desc) updateData.desc = desc;
        if (idLabels) updateData.idLabels = idLabels;
        if (due) updateData.due = due;
        if (start) updateData.start = start;
        if (idMembers) updateData.idMembers = idMembers;

        const card = await trello.put(`/cards/${cardId}`, updateData);
        return { content: [{ type: "text", text: `Card ${cardId} updated successfully.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },

    async handleUpdateCardName(args: any) {
      try {
        const { cardId, name } = args;
        await trello.put(`/cards/${cardId}`, { name });
        return { content: [{ type: "text", text: `Card renamed to ${name}.` }] };
      } catch (error) { return { content: [{ type: "text", text: `Error: ${error}` }], isError: true }; }
    },
  };
}
