"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_sqlite_1 = require("node:sqlite");
//Skapa tasks-tabell om den inte redan finns
exports.db = new node_sqlite_1.DatabaseSync('./scrumboardDatabase.db');
exports.db.exec(`
     CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          project TEXT NOT NULL,
          description TEXT NOT NULL,
          deadline TEXT NOT NULL,
          person TEXT  NOT NULL DEFAULT 'undefined',
          status TEXT CHECK(status IN ('new', 'doing', 'done')) NOT NULL DEFAULT 'new',
          category TEXT CHECK(category IN ('ux', 'frontend', 'backend')) NOT NULL DEFAULT 'frontend'
     );
`);
