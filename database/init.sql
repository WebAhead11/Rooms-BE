qBEGIN;

DROP TABLE IF EXISTS users, rooms, user_room CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255)  NOT NULL UNIQUE
);


CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  creator TEXT REFERENCES users(username),
  max_users INTEGER
);

CREATE TABLE user_room(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL REFERENCES users(username),
  room_id INTEGER REFERENCES rooms(id)
);
INSERT INTO users (username) VALUES
  ('kassim'),
  ('omar')
;
INSERT INTO rooms (name,description,creator) VALUES
  ('bathroom','a place where you do the dodo','kassim'),
  ('livingroom','a place for the living. you will not find your grandpa there','omar')
;
INSERT INTO user_room (username,room_id) VALUES
  ('kassim',1),
  ('omar',2)
;

COMMIT;