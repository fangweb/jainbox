import * as pgPromise from "pg-promise";
import * as panelQueries from "./queries/panel.queries";
import { Db } from "../db";

export class PanelRepository {
  public static getInboxMessages({
    usernameId,
    offset,
    limit
  }: {
    usernameId: number;
    offset: number;
    limit: number;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.getPanelInboxMessages, {
          usernameId,
          offset,
          limit
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static getSentMessages({
    usernameId,
    offset,
    limit
  }: {
    usernameId: number;
    offset: number;
    limit: number;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.getPanelSentMessages, {
          usernameId,
          offset,
          limit
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static getTrashedMessages({
    usernameId,
    offset,
    limit
  }: {
    usernameId: number;
    offset: number;
    limit: number;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.getPanelTrashMessages, {
          usernameId,
          offset,
          limit
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static putMessagesIntoTrash({
    usernameId,
    messageIds
  }: {
    usernameId: number;
    messageIds: number[];
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (messageIds.length < 1) {
          return resolve([]);
        }
        const data = messageIds.map(messageId => ({
          username_id: usernameId,
          message_id: messageId,
          show_inbox: false,
          show_sent: false,
          archive_level: 1
        }));
        console.log(data);
        const result = await Db.any(panelQueries.updatePanelMessageQuery(data));
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static putMessagesIntoInbox({
    usernameId,
    messageIds
  }: {
    usernameId: number;
    messageIds: number[];
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (messageIds.length < 1) {
          return resolve([]);
        }
        const data = messageIds.map(messageId => ({
          username_id: usernameId,
          message_id: messageId,
          show_inbox: true,
          show_sent: false,
          archive_level: 0
        }));
        const result = await Db.any(panelQueries.updatePanelMessageQuery(data));
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static softDeleteMessages({
    usernameId,
    messageIds
  }: {
    usernameId: number;
    messageIds: number[];
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (messageIds.length < 1) {
          return resolve([]);
        }
        const data = messageIds.map(messageId => ({
          username_id: usernameId,
          message_id: messageId,
          show_inbox: false,
          show_sent: false,
          archive_level: 2
        }));

        const result = await Db.any(panelQueries.updatePanelMessageQuery(data));
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static getRegisteredUsers(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.getRegisteredUsers);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static updateIsViewed({
    usernameId,
    messageId,
    isViewed
  }: {
    usernameId: number;
    messageId: number;
    isViewed: boolean;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const single = {
        username_id: usernameId,
        message_id: messageId,
        is_viewed: isViewed
      };
      try {
        const result = await Db.one(panelQueries.updateIsViewedQuery(single));
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
