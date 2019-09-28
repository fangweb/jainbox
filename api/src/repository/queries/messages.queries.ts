export const createMessage = `WITH receiver AS (
                               SELECT id FROM jainbox_schema.users
                               WHERE username=$[receiverName]
                             )
                             INSERT INTO jainbox_schema.messages(created_by_id, receiver_id, created_at, message_text)
                             VALUES ($[createdById], ( SELECT id FROM receiver ), $[createdAt], $[messageText])
                             RETURNING *;`;

export const viewMessage = `SELECT messages.id as message_id, messages.created_at, messages.message_text, users.username
                            FROM jainbox_schema.messages
                              LEFT JOIN jainbox_schema.users ON users.id = messages.created_by_id
                            WHERE messages.id = $[messageId]
                            AND messages.receiver_id = $[usernameId]
                            LIMIT 1;`;
