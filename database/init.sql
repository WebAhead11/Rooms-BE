BEGIN;

DROP TABLE IF EXISTS users, rooms CASCADE;

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255)  NOT NULL ,
  room_id INTEGER REFERENCES rooms(id)
);

INSERT INTO rooms (name,description) VALUES
  ('bathroom','a place where you do the dodo'),
  ('livingroom','a place for the living. you will not find your grandpa there')
;

INSERT INTO users (username,room_id) VALUES
  ('kassim','1'),
  ('omar','2')
;


COMMIT;