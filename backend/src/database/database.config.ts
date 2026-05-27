import {DatabaseSync} from 'node:sqlite';

//Skapa tasks-tabell om den inte redan finns
export const db = new DatabaseSync('./scrumboard.db');

db.exec(
     `
     CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          project TEXT NOT NULL,
          description TEXT NOT NULL,
          deadline TEXT NOT NULL,
          person TEXT,
          status TEXT CHECK(status IN ('new', 'doing', 'done')) NOT NULL DEFAULT 'new',
          category TEXT CHECK(category IN ('ux', 'frontend', 'backend')) NOT NULL DEFAULT 'frontend'
     );
`);