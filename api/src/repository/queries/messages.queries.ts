export const createMessage = `WITH receiver AS (
                               SELECT id FROM jainbox_schema.users
                               WHERE username=$[receiverName]
                             )
                             INSERT INTO jainbox_schema.messages(created_by_id, receiver_id, created_at, message_text)
                             VALUES ($[createdById], ( SELECT id FROM receiver ), $[createdAt], $[messageText])
                             RETURNING *;`;

export const getMessage = `SELECT * FROM jainbox_schema.messages
                           WHERE id = $[messageId]
                           LIMIT 1;`;
