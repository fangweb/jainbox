import { ApiConfig } from '../config';
import { HttpClient } from '../lib/httpClient';
import Session from '../lib/session';

export class ApiService {
  static getBaseHeaders() {
    return {
      Accept: ApiConfig.headers.acceptValue,
      'Content-Type': ApiConfig.headers.contentTypeValue
    };
  }

  static getAuthHeaders() {
    const tokenString = Session.get('jwt');
    if (!tokenString) {
      throw new Error('Token is not set inside session');
    }

    return {
      ...this.getBaseHeaders(),
      Authorization: `${ApiConfig.authScheme} ${tokenString}`
    };
  }

  static async getInbox({ page }) {
    const response = await HttpClient.get(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/inbox?page=${page}`
    );
    return response;
  }

  static async getSent({ page }) {
    const response = await HttpClient.get(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/sent?page=${page}`
    );
    return response;
  }

  static async getTrash({ page }) {
    const response = await HttpClient.get(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/trash?page=${page}`
    );
    return response;
  }

  static async softDeleteMessage({ messageId }) {
    const response = await HttpClient.delete(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/message`,
      { message_id: messageId }
    );
    return response;
  }

  static async putMessageIntoInbox({ messageId }) {
    const response = await HttpClient.put(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/message`,
      {
        message_id: messageId
      }
    );
    return response;
  }

  static async compose({ receiverName, messageText }) {
    const response = await HttpClient.post(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/messages/compose`,
      { receiver_name: receiverName, message_text: messageText }
    );
    return response;
  }
}
