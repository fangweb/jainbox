export const createPanelMessages = `INSERT INTO jainbox_schema.panel(username_id, message_id, show_inbox, show_sent)
                                    VALUES ($[createdById], $[messageId], false, true), ($[receiverId], $[messageId], true, false)
                                    RETURNING id, username_id;`;

export const updatePanelMessage = `UPDATE jainbox_schema.panel
                                   SET show_inbox = COALESCE($[showInbox], show_inbox),
                                       show_sent = COALESCE($[showSent], show_sent),
                                       archive_level = COALESCE($[archiveLevel], archive_level)
                                   WHERE username_id = $[usernameId]
                                   AND message_id = $[messageId]
                                   RETURNING *`;

export const getPanelInboxMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level,
                                       messages.created_at, users.username as from
                                      FROM jainbox_schema.panel
                                        LEFT JOIN jainbox_schema.messages ON panel.message_id = messages.id
                                        LEFT JOIN jainbox_schema.users ON messages.created_by_id = users.id
                                      WHERE panel.username_id = $[usernameId]
                                        AND panel.show_inbox = true
                                        AND panel.show_sent = false
                                        AND panel.archive_level = 0
                                      ORDER BY created_at DESC
                                      OFFSET $[offset] LIMIT $[limit];`;

export const getPanelSentMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level,
                                       messages.created_at, users.username as to
                                     FROM jainbox_schema.panel
                                       LEFT JOIN jainbox_schema.messages ON panel.message_id = messages.id
                                       LEFT JOIN jainbox_schema.users ON messages.receiver_id = users.id
                                     WHERE panel.username_id = $[usernameId]
                                       AND panel.show_inbox = false
                                       AND panel.show_sent = true
                                       AND panel.archive_level = 0
                                     ORDER BY created_at DESC
                                     OFFSET $[offset] LIMIT $[limit];`;

export const getPanelTrashMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level,
                                       messages.created_at, users.username as from
                                      FROM jainbox_schema.panel
                                        LEFT JOIN jainbox_schema.messages ON panel.message_id = messages.id
                                        LEFT JOIN jainbox_schema.users ON messages.created_by_id = users.id
                                      WHERE panel.username_id = $[usernameId]
                                        AND panel.show_inbox = false
                                        AND panel.show_sent = false
                                        AND panel.archive_level = 1
                                      ORDER BY created_at DESC
                                      OFFSET $[offset] LIMIT $[limit];`;

export const getRegisteredUsers = `SELECT users.id, users.username
                                   FROM jainbox_schema.users
                                   ORDER BY username ASC;`;
