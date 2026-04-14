import axios from "axios";
import { TRELLO_BASE_URL } from "../config/config.js";
export class TrelloApi {
    apiKey;
    token;
    baseUrl;
    constructor(apiKey, token, baseUrl = TRELLO_BASE_URL ?? "") {
        this.apiKey = apiKey;
        this.token = token;
        this.baseUrl = baseUrl;
    }
    async get(path, params = {}) {
        const response = await axios.get(`${this.baseUrl}${path}`, {
            params: {
                key: this.apiKey,
                token: this.token,
                ...params,
            },
        });
        return response.data;
    }
    async post(path, data = {}) {
        const response = await axios.post(`${this.baseUrl}${path}`, null, {
            params: {
                key: this.apiKey,
                token: this.token,
                ...data,
            },
        });
        return response.data;
    }
    async put(path, data = {}) {
        const response = await axios.put(`${this.baseUrl}${path}`, null, {
            params: {
                key: this.apiKey,
                token: this.token,
                ...data,
            },
        });
        return response.data;
    }
    async delete(path, data = {}) {
        const response = await axios.delete(`${this.baseUrl}${path}`, {
            params: {
                key: this.apiKey,
                token: this.token,
                ...data,
            },
        });
        return response.data;
    }
    async createList(boardId, name) {
        return await this.post("/lists", { idBoard: boardId, name });
    }
}
