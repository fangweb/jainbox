import * as pgPromise from "pg-promise";
import * as messageQueries from "./queries/messages.queries";
import * as panelQueries from "./queries/panel.queries";
import { Db } from "../db";

export class MessagesRepository {
  public static compose({
    createdById,
    receiverName,
    title,
    messageText
  }: {
    createdById: number;
    receiverName: string;
    title: string;
    messageText: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      Db.tx(async t => {
        const createdMessage = await t.one(messageQueries.createMessage, {
          createdById,
          receiverName,
          createdAt: new Date(),
          title,
          messageText
        });
        await t.many(panelQueries.createPanelMessages, {
          messageId: createdMessage.id,
          createdById,
          receiverId: createdMessage.receiver_id
        });
        return createdMessage;
      })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  public static viewMessage({
    messageId,
    usernameId
  }: {
    messageId: number;
    usernameId: number;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const viewMessage = await Db.one(messageQueries.viewMessage, {
          messageId,
          usernameId
        });
        resolve(viewMessage);
      } catch (error) {
        reject(error);
      }
    });
  }
}
