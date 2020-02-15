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

  static async getRegisteredUsers() {
    const response = await HttpClient.get(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/registered-users`
    );
    return response;
  }

  static async softDeleteMessages({ messageIds }) {
    const response = await HttpClient.post(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/soft-delete`,
      { message_ids: messageIds }
    );
    return response;
  }

  static async restoreMessagesInTrash({ messageIds }) {
    const response = await HttpClient.post(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/trash/restore`,
      {
        message_ids: messageIds
      }
    );
    return response;
  }

  static async moveMessagesFromInboxIntoTrash({ messageIds }) {
    const response = await HttpClient.post(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/panel/inbox/trash`,
      {
        message_ids: messageIds
      }
    );
    return response;
  }

  static async sendMessage({ to, title, messageText }) {
    const response = await HttpClient.post(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/messages/compose`,
      { receiver_name: to, title, message_text: messageText }
    );
    return response;
  }

  static async viewMessage({ messageId }) {
    const response = await HttpClient.get(
      this.getAuthHeaders(),
      `${ApiConfig.basePath}/messages/view?message_id=${messageId}`
    );
    return response;
  }
}
