import * as pgp from "pg-promise";

const pgPromise = pgp({
  capSQL: true
});

export const createPanelMessages = `INSERT INTO jainbox_schema.panel(username_id, message_id, show_inbox, show_sent)
                                    VALUES ($[createdById], $[messageId], false, true), ($[receiverId], $[messageId], true, false)
                                    RETURNING id, username_id;`;

/**
 * export const updatePanelMessage = `UPDATE jainbox_schema.panel
 *                                    SET show_inbox = COALESCE($[showInbox], show_inbox),
 *                                        show_sent = COALESCE($[showSent], show_sent),
 *                                        archive_level = COALESCE($[archiveLevel], archive_level),
 *                                        is_viewed = COALESCE($[isViewed], is_viewed)
 *                                    WHERE username_id = $[usernameId]
 *                                    AND message_id = $[messageId]
 *                                    RETURNING *`;
 */

const updatePanelMessageColumnSet = new pgPromise.helpers.ColumnSet(
  ["?username_id", "?message_id", "show_inbox", "show_sent", "archive_level"],
  { table: { table: "panel", schema: "jainbox_schema" } }
);
export const updatePanelMessageQuery = (multi: any) =>
  pgPromise.helpers.update(multi, updatePanelMessageColumnSet) +
  " WHERE v.username_id = t.username_id AND v.message_id = t.message_id";
export const updateIsViewedQuery = (single: {
  username_id: number;
  message_id: number;
  is_viewed: boolean;
}) => {
  const condition = pgPromise.as.format(
    " WHERE username_id = ${username_id} AND message_id = ${message_id} RETURNING *",
    single
  );
  return (
    pgPromise.helpers.update(single, ["is_viewed"], {
      table: "panel",
      schema: "jainbox_schema"
    }) + condition
  );
};

export const getPanelInboxMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level, panel.is_viewed,
                                       messages.created_at, messages.title, users.username as from
                                      FROM jainbox_schema.panel
                                        INNER JOIN jainbox_schema.messages ON panel.message_id = messages.id
                                        INNER JOIN jainbox_schema.users ON messages.created_by_id = users.id
                                      WHERE panel.username_id = $[usernameId]
                                        AND panel.show_inbox = true
                                        AND panel.show_sent = false
                                        AND panel.archive_level = 0
                                      ORDER BY created_at DESC
                                      OFFSET $[offset] LIMIT $[limit];`;

export const getPanelSentMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level,
                                       messages.created_at, messages.title, users.username as to
                                     FROM jainbox_schema.panel
                                       INNER JOIN jainbox_schema.messages ON panel.message_id = messages.id
                                       INNER JOIN jainbox_schema.users ON messages.receiver_id = users.id
                                     WHERE panel.username_id = $[usernameId]
                                       AND panel.show_inbox = false
                                       AND panel.show_sent = true
                                       AND panel.archive_level = 0
                                     ORDER BY created_at DESC
                                     OFFSET $[offset] LIMIT $[limit];`;

export const getPanelTrashMessages = `SELECT panel.id as panel_id, panel.message_id, panel.archive_level, panel.is_viewed,
                                       messages.created_at, messages.title, users.username as from
                                      FROM jainbox_schema.panel
                                        INNER JOIN jainbox_schema.messages ON panel.message_id = messages.id
                                        INNER JOIN jainbox_schema.users ON messages.created_by_id = users.id
                                      WHERE panel.username_id = $[usernameId]
                                        AND panel.show_inbox = false
                                        AND panel.show_sent = false
                                        AND panel.archive_level = 1
                                      ORDER BY created_at DESC
                                      OFFSET $[offset] LIMIT $[limit];`;

export const getRegisteredUsers = `SELECT users.id, users.username
                                   FROM jainbox_schema.users
                                   ORDER BY username ASC;`;
