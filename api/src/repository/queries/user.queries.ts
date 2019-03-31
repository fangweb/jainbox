export const createAccount = `INSERT INTO jainbox_schema.users(username, hash)
                              VALUES ($[username],$[hash])
                              RETURNING id, username;`;

export const details = `SELECT * FROM jainbox_schema.users
                        WHERE username = $[username]
                        AND deactivated=false LIMIT 1;`;

export const deactivate = `UPDATE jainbox_schema.users SET deactivated = $[deactivate]
                           WHERE id = (
                             SELECT id
                             FROM jainbox_schema.users
                             WHERE username = $[username] AND hash = $[hash]
                           )
                           RETURNING id, username, deactivated;`;

export const createStatus = `INSERT INTO jainbox_schema.user_online_status(username_id)
                             VALUES($[usernameId]);`;

export const updateStatus = `UPDATE jainbox_schema.user_online_status SET online_status = $[onlineStatus]
                             WHERE username_id = $[usernameId]
                             RETURNING username_id, online_status;`;
