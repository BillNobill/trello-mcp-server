import axios from "axios";
import { TRELLO_BASE_URL } from "../config/config.js";
import fs from "fs";
export class TrelloApi {
    apiKey;
    token;
    baseUrl;
    constructor(apiKey, token, baseUrl = TRELLO_BASE_URL ?? "") {
        this.apiKey = apiKey;
        this.token = token;
        this.baseUrl = baseUrl;
    }
    getAuthParams() {
        return {
            key: this.apiKey,
            token: this.token,
        };
    }
    async get(path, params = {}) {
        const response = await axios.get(`${this.baseUrl}${path}`, {
            params: {
                ...this.getAuthParams(),
                ...params,
            },
        });
        return response.data;
    }
    async post(path, data = {}, isFormData = false) {
        if (isFormData) {
            // Para upload de arquivos reais
            const response = await axios.post(`${this.baseUrl}${path}`, data, {
                params: this.getAuthParams(),
                headers: {
                    ...(data.getHeaders ? data.getHeaders() : {}),
                },
            });
            return response.data;
        }
        const response = await axios.post(`${this.baseUrl}${path}`, null, {
            params: {
                ...this.getAuthParams(),
                ...data,
            },
        });
        return response.data;
    }
    async put(path, data = {}) {
        // Trello prefere params mesmo em PUT para a maioria dos campos simples
        const response = await axios.put(`${this.baseUrl}${path}`, null, {
            params: {
                ...this.getAuthParams(),
                ...data,
            },
        });
        return response.data;
    }
    async delete(path, data = {}) {
        const response = await axios.delete(`${this.baseUrl}${path}`, {
            params: {
                ...this.getAuthParams(),
                ...data,
            },
        });
        return response.data;
    }
    async uploadFile(cardId, filePath, name) {
        // Importação dinâmica para evitar problemas de ESM/CommonJS dependendo do ambiente
        const FormData = (await import("form-data")).default;
        const form = new FormData();
        form.append("file", fs.createReadStream(filePath));
        if (name)
            form.append("name", name);
        return this.post(`/cards/${cardId}/attachments`, form, true);
    }
}
