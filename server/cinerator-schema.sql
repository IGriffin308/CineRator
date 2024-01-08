CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL
    REFERENCES users.id ON DELETE CASCADE,
  movie_id INTEGER NOT NULL,
  comment VARCHAR(1000),
  rating INTEGER CHECK (rating >= 1, rating <= 5),
  favorite BOOLEAN NOT NULL DEFAULT FALSE,
);