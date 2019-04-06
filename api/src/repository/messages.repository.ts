import * as pgPromise from 'pg-promise';
import * as messageQueries from './queries/messages.queries';
import * as panelQueries from './queries/panel.queries';
import { Db } from '../db';

export class MessagesRepository {
  public static compose({
    createdById,
    receiverName,
    messageText
  }: {
    createdById: number;
    receiverName: string;
    messageText: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      Db.tx(async t => {
        const createdMessage = await t.one(messageQueries.createMessage, {
          createdById,
          receiverName,
          createdAt: new Date(),
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

}
