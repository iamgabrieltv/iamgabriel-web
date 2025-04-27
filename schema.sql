-- SQLite schema for the 'guestbook' table
CREATE TABLE guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    message TEXT,
    email_hash TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
    updated_at INTEGER
);

-- SQLite schema for the 'session' table
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES guestbook (id)
);