import * as pgPromise from 'pg-promise';
import * as panelQueries from './queries/panel.queries';
import { Db } from '../db';


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

  public static putMessageIntoTrash({ usernameId, messageId }: { usernameId: number; messageId: number }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.updatePanelMessage, {
          usernameId,
          messageId,
          showInbox: false,
          showSent: false,
          archiveLevel: 1
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** such is an undo action from trash */
  public static putMessageIntoInbox({ usernameId, messageId }: { usernameId: number; messageId: number }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.updatePanelMessage, {
          usernameId,
          messageId,
          showInbox: true,
          showSent: false,
          archiveLevel: 0
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static softDeleteMessage({ usernameId, messageId }: { usernameId: number; messageId: number }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Db.any(panelQueries.updatePanelMessage, {
          usernameId,
          messageId,
          showInbox: false,
          showSent: false,
          archiveLevel: 2
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}
