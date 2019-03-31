export const createPanelMessages = `INSERT INTO jainbox_schema.panel(username_id, message_id, show_inbox, show_sent)
                                   VALUES ($[createdById], $[messageId], false, true), ($[receiverId], $[messageId], true, false)
                                   RETURNING id, username_id;`;

export const updatePanelMessage = `UPDATE jainbox_schema.panel
                                   SET show_inbox = COALESCE($[showInbox], show_inbox),
                                       show_sent = COALESCE($[showSent], show_sent),
                                       archive_level = COALESCE($[archiveLevel], archive_level)
                                   WHERE username_id = $[usernameId]
                                   AND message_id = $[messageId]
                                   RETURNING id, archive_level;`;

export const getPanelMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level,
                                        messages.id as message_id, messages.created_by_id, messages.receiver_id,
                                        messages.created_at
                                 FROM jainbox_schema.panel
                                 LEFT JOIN jainbox_schema.messages
                                 ON panel.message_id = messages.id
                                 WHERE panel.username_id = $[usernameId]
                                 AND show_inbox = $[showInbox]
                                 AND show_sent = $[showSent]
                                 AND archive_level = $[archiveLevel]
                                 ORDER BY created_at DESC
                                 OFFSET $[offset] LIMIT $[limit];`;
