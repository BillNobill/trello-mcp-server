export function createToolHandlers(trello) {
    return {
        async handleListBoards() {
            try {
                const boards = await trello.get("/members/me/boards", { fields: "id,name,closed" });
                return { content: [{ type: "text", text: JSON.stringify(boards.filter((b) => !b.closed).map((b) => ({ id: b.id, name: b.name })), null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleReadBoard(args) {
            try {
                const { boardId } = args;
                const lists = await trello.get(`/boards/${boardId}/lists`, { fields: "id,name,closed" });
                const openLists = lists.filter((list) => !list.closed);
                const listWithCards = await Promise.all(openLists.map(async (list) => {
                    const cards = await trello.get(`/lists/${list.id}/cards`, { fields: "id,name,closed,labels,idMembers,desc,due,start" });
                    return {
                        listId: list.id,
                        listName: list.name,
                        cards: cards.filter((c) => !c.closed).map((card) => ({
                            id: card.id,
                            name: card.name,
                            description: card.desc,
                            labels: card.labels.map((l) => ({ id: l.id, name: l.name, color: l.color })),
                            members: card.idMembers,
                            due: card.due,
                            start: card.start,
                        })),
                    };
                }));
                return { content: [{ type: "text", text: JSON.stringify(listWithCards, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetBoardLabels(args) {
            try {
                const { boardId } = args;
                const labels = await trello.get(`/boards/${boardId}/labels`, { fields: "id,name,color" });
                return { content: [{ type: "text", text: JSON.stringify(labels, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetBoardMembers(args) {
            try {
                const { boardId } = args;
                const members = await trello.get(`/boards/${boardId}/members`, { fields: "id,fullName,username" });
                return { content: [{ type: "text", text: JSON.stringify(members, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleCreateCard(args) {
            try {
                const { listId, name, desc, idLabels, idMembers, due, start, pos } = args;
                const params = { idList: listId, name, desc, idLabels, idMembers, due, start };
                if (pos)
                    params.pos = pos;
                const card = await trello.post("/cards", params);
                return { content: [{ type: "text", text: JSON.stringify(card, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleAssignMember(args) {
            try {
                const { cardId, memberId } = args;
                await trello.post(`/cards/${cardId}/idMembers`, { value: memberId });
                return { content: [{ type: "text", text: `Member ${memberId} assigned to card ${cardId}.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleAddChecklist(args) {
            try {
                const { cardId, name, items } = args;
                const checklist = await trello.post(`/cards/${cardId}/checklists`, { name });
                if (items) {
                    for (const item of items.split(",").map((i) => i.trim())) {
                        await trello.post(`/checklists/${checklist.id}/checkItems`, { name: item });
                    }
                }
                return { content: [{ type: "text", text: `Checklist '${name}' added.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUpdateChecklist(args) {
            try {
                const { checklistId, name, pos } = args;
                const params = {};
                if (name)
                    params.name = name;
                if (pos)
                    params.pos = pos;
                await trello.put(`/checklists/${checklistId}`, params);
                return { content: [{ type: "text", text: `Checklist ${checklistId} updated.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleDeleteChecklist(args) {
            try {
                const { checklistId } = args;
                await trello.delete(`/checklists/${checklistId}`);
                return { content: [{ type: "text", text: `Checklist ${checklistId} deleted.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleCreateCheckItem(args) {
            try {
                const { checklistId, name, pos } = args;
                const params = { name };
                if (pos)
                    params.pos = pos;
                await trello.post(`/checklists/${checklistId}/checkItems`, params);
                return { content: [{ type: "text", text: `Item '${name}' added to checklist.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUpdateCheckItem(args) {
            try {
                const { cardId, checkItemId, name, state, pos } = args;
                const params = {};
                if (name)
                    params.name = name;
                if (state)
                    params.state = state;
                if (pos)
                    params.pos = pos;
                await trello.put(`/cards/${cardId}/checkItem/${checkItemId}`, params);
                return { content: [{ type: "text", text: `Check item ${checkItemId} updated.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleDeleteCheckItem(args) {
            try {
                const { checklistId, checkItemId } = args;
                await trello.delete(`/checklists/${checklistId}/checkItems/${checkItemId}`);
                return { content: [{ type: "text", text: `Item ${checkItemId} deleted.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleAddAttachment(args) {
            try {
                const { cardId, url, name } = args;
                const attachment = await trello.post(`/cards/${cardId}/attachments`, { url, name });
                return { content: [{ type: "text", text: `Attachment added to card ${cardId}: ${attachment.id}` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleCreateList(args) {
            try {
                const { boardId, name, pos } = args;
                const params = { idBoard: boardId, name };
                if (pos)
                    params.pos = pos;
                const list = await trello.post("/lists", params);
                return { content: [{ type: "text", text: JSON.stringify(list, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleMoveCard(args) {
            try {
                const { cardId, listId, pos } = args;
                const params = { idList: listId };
                if (pos)
                    params.pos = pos;
                await trello.put(`/cards/${cardId}`, params);
                return { content: [{ type: "text", text: `Card moved successfully.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleAddComment(args) {
            try {
                const { cardId, text } = args;
                await trello.post(`/cards/${cardId}/actions/comments`, { text });
                return { content: [{ type: "text", text: `Comment added to card ${cardId}` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleArchiveCard(args) {
            try {
                const { cardId } = args;
                await trello.put(`/cards/${cardId}`, { closed: true });
                return { content: [{ type: "text", text: `Card ${cardId} archived.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleArchiveList(args) {
            try {
                const { listId } = args;
                await trello.put(`/lists/${listId}`, { closed: true });
                return { content: [{ type: "text", text: `List ${listId} archived.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleDeleteBoard(args) {
            try {
                const { boardId } = args;
                await trello.delete(`/boards/${boardId}`);
                return { content: [{ type: "text", text: `Board ${boardId} deleted.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUpdateList(args) {
            try {
                const { listId, name, pos } = args;
                const params = {};
                if (name)
                    params.name = name;
                if (pos)
                    params.pos = pos;
                await trello.put(`/lists/${listId}`, params);
                return { content: [{ type: "text", text: `List updated successfully.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUpdateCard(args) {
            try {
                const { cardId, name, desc, idLabels, due, start, idMembers, pos } = args;
                const updateData = {};
                if (name)
                    updateData.name = name;
                if (desc)
                    updateData.desc = desc;
                if (idLabels)
                    updateData.idLabels = idLabels;
                if (due)
                    updateData.due = due;
                if (start)
                    updateData.start = start;
                if (idMembers)
                    updateData.idMembers = idMembers;
                if (pos)
                    updateData.pos = pos;
                await trello.put(`/cards/${cardId}`, updateData);
                return { content: [{ type: "text", text: `Card ${cardId} updated successfully.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUpdateCardName(args) {
            try {
                const { cardId, name } = args;
                await trello.put(`/cards/${cardId}`, { name });
                return { content: [{ type: "text", text: `Card renamed to ${name}.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetListsOnBoard(args) {
            try {
                const { boardId } = args;
                const lists = await trello.get(`/boards/${boardId}/lists`, { fields: "id,name,closed" });
                return { content: [{ type: "text", text: JSON.stringify(lists.filter((l) => !l.closed).map((l) => ({ id: l.id, name: l.name })), null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetCardsInList(args) {
            try {
                const { listId } = args;
                const cards = await trello.get(`/lists/${listId}/cards`, { fields: "id,name,closed,labels,idMembers,desc,due,start" });
                return { content: [{ type: "text", text: JSON.stringify(cards.filter((c) => !c.closed).map((card) => ({
                                id: card.id,
                                name: card.name,
                                description: card.desc,
                                labels: card.labels.map((l) => ({ id: l.id, name: l.name, color: l.color })),
                                members: card.idMembers,
                                due: card.due,
                                start: card.start,
                            })), null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetCardsByDate(args) {
            try {
                const { boardId, since, before } = args;
                const params = { fields: "id,name,closed,labels,idMembers,desc,due,start" };
                if (since)
                    params.since = since;
                if (before)
                    params.before = before;
                const cards = await trello.get(`/boards/${boardId}/cards`, params);
                return { content: [{ type: "text", text: JSON.stringify(cards.filter((c) => !c.closed).map((card) => ({
                                id: card.id,
                                name: card.name,
                                description: card.desc,
                                labels: card.labels.map((l) => ({ id: l.id, name: l.name, color: l.color })),
                                members: card.idMembers,
                                due: card.due,
                                start: card.start,
                            })), null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetMemberWorkload(args) {
            try {
                const { boardId, memberId } = args;
                const cards = await trello.get(`/boards/${boardId}/cards`, { fields: "id,name,closed,labels,idMembers,desc,due,start" });
                const memberCards = cards.filter((c) => !c.closed && c.idMembers.includes(memberId));
                return { content: [{ type: "text", text: JSON.stringify(memberCards.map((card) => ({
                                id: card.id,
                                name: card.name,
                                description: card.desc,
                                labels: card.labels.map((l) => ({ id: l.id, name: l.name, color: l.color })),
                                members: card.idMembers,
                                due: card.due,
                                start: card.start,
                            })), null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleGetCardDetails(args) {
            try {
                const { cardId } = args;
                const card = await trello.get(`/cards/${cardId}`, {
                    fields: "all",
                    actions: "commentCard",
                    attachments: "true",
                    checklists: "all"
                });
                return { content: [{ type: "text", text: JSON.stringify(card, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleSearchCards(args) {
            try {
                const { boardId, query } = args;
                const results = await trello.get("/search", { query, idBoards: boardId, modelTypes: "cards", card_fields: "id,name,closed,labels,idMembers,desc,due,start" });
                return { content: [{ type: "text", text: JSON.stringify(results.cards.filter((c) => !c.closed), null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleCreateLabel(args) {
            try {
                const { boardId, name, color } = args;
                const label = await trello.post("/labels", { idBoard: boardId, name, color });
                return { content: [{ type: "text", text: JSON.stringify(label, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUpdateLabel(args) {
            try {
                const { labelId, name, color } = args;
                const params = {};
                if (name)
                    params.name = name;
                if (color)
                    params.color = color;
                const label = await trello.put(`/labels/${labelId}`, params);
                return { content: [{ type: "text", text: JSON.stringify(label, null, 2) }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleMoveAllCards(args) {
            try {
                const { boardId, idListSource, idListDest } = args;
                await trello.post(`/lists/${idListSource}/moveAllCards`, { idBoard: boardId, idList: idListDest });
                return { content: [{ type: "text", text: `All cards moved from ${idListSource} to ${idListDest}.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleUploadFile(args) {
            try {
                const { cardId, filePath, name } = args;
                const attachment = await trello.uploadFile(cardId, filePath, name);
                return { content: [{ type: "text", text: `File uploaded successfully: ${attachment.id}` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
        async handleSetCustomField(args) {
            try {
                const { cardId, customFieldId, value } = args;
                await trello.put(`/cards/${cardId}/customField/${customFieldId}/item`, { value: { text: value } });
                return { content: [{ type: "text", text: `Custom field ${customFieldId} updated for card ${cardId}.` }] };
            }
            catch (error) {
                return { content: [{ type: "text", text: `Error: ${error}` }], isError: true };
            }
        },
    };
}
