import axios from "axios";
import { TRELLO_BASE_URL } from "../config/config.js";
import fs from "fs";
import path from "path";

export class TrelloApi {
  private apiKey: string;
  private token: string;
  private baseUrl: string;

  constructor(
    apiKey: string,
    token: string,
    baseUrl: string = TRELLO_BASE_URL ?? ""
  ) {
    this.apiKey = apiKey;
    this.token = token;
    this.baseUrl = baseUrl;
  }

  private getAuthParams() {
    return {
      key: this.apiKey,
      token: this.token,
    };
  }

  async get(path: string, params: Record<string, any> = {}) {
    const response = await axios.get(`${this.baseUrl}${path}`, {
      params: {
        ...this.getAuthParams(),
        ...params,
      },
    });
    return response.data;
  }

  async post(path: string, data: any = {}, isFormData: boolean = false) {
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

  async put(path: string, data: Record<string, any> = {}) {
    // Trello prefere params mesmo em PUT para a maioria dos campos simples
    const response = await axios.put(`${this.baseUrl}${path}`, null, {
      params: {
        ...this.getAuthParams(),
        ...data,
      },
    });
    return response.data;
  }

  async delete(path: string, data: Record<string, any> = {}) {
    const response = await axios.delete(`${this.baseUrl}${path}`, {
      params: {
        ...this.getAuthParams(),
        ...data,
      },
    });
    return response.data;
  }

  async uploadFile(cardId: string, filePath: string, name?: string) {
    // Importação dinâmica para evitar problemas de ESM/CommonJS dependendo do ambiente
    const FormData = (await import("form-data")).default;
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    if (name) form.append("name", name);

    return this.post(`/cards/${cardId}/attachments`, form, true);
  }
}
