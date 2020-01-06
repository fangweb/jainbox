ALTER DATABASE jainbox SET search_path TO jainbox_schema,public;

DROP SCHEMA IF EXISTS jainbox_schema CASCADE;
CREATE SCHEMA IF NOT EXISTS jainbox_schema;

CREATE TABLE jainbox_schema.users
(
id serial PRIMARY KEY,
username text UNIQUE NOT NULL,
hash text NOT NULL,
deactivated boolean DEFAULT false NOT NULL
);

CREATE INDEX users_username_idx ON jainbox_schema.users (username);

CREATE TABLE jainbox_schema.user_online_status
(
id serial PRIMARY KEY,
username_id integer NOT NULL REFERENCES jainbox_schema.users (id) ON DELETE CASCADE,
online_status boolean DEFAULT false NOT NULL
);

CREATE TABLE jainbox_schema.messages 
(
id serial PRIMARY KEY,
created_by_id integer NOT NULL REFERENCES jainbox_schema.users (id) ON DELETE CASCADE,
receiver_id integer NOT NULL REFERENCES jainbox_schema.users (id) ON DELETE CASCADE,
created_at timestamptz NOT NULL,
title text NOT NULL,
message_text text NOT NULL,
CHECK ( created_by_id != receiver_id )
);

CREATE TABLE jainbox_schema.panel 
(
id serial PRIMARY KEY,
username_id integer NOT NULL REFERENCES jainbox_schema.users (id) ON DELETE CASCADE,
message_id integer NOT NULL REFERENCES jainbox_schema.messages (id) ON DELETE CASCADE,
archive_level integer DEFAULT 0 NOT NULL,
show_inbox boolean DEFAULT false NOT NULL,
show_sent boolean DEFAULT false NOT NULL,
is_viewed boolean DEFAULT false NOT NULL,
CHECK ( archive_level BETWEEN 0 AND 2 )
);

CREATE INDEX inbox_username_id_idx ON jainbox_schema.panel (username_id);


