"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllStmt = exports.deleteTaskStmt = exports.assignStmt = exports.updateStatusStmt = exports.getAllTasksStmt = exports.createTaskStmt = void 0;
const database_config_1 = require("./database.config");
//lägga till ny task i tabell
exports.createTaskStmt = database_config_1.db.prepare(`
   INSERT INTO tasks (title, project, description, deadline, category) VALUES (?,?,?,?,?)
`);
//Hämta alla tasks
exports.getAllTasksStmt = database_config_1.db.prepare(`
   SELECT * FROM tasks
`);
//Uppdatera status
exports.updateStatusStmt = database_config_1.db.prepare(`
   UPDATE tasks SET status = ? WHERE id = ?
`);
exports.assignStmt = database_config_1.db.prepare(`
   UPDATE tasks SET status = ?, person = ? WHERE id = ?
`);
//Ta bort task
exports.deleteTaskStmt = database_config_1.db.prepare(`
   DELETE FROM tasks WHERE id = ?   
`);
//Uppdatera alla fält utom status & id
exports.updateAllStmt = database_config_1.db.prepare(`
      UPDATE tasks SET title = ?, project = ?, description = ?, deadline = ?, category = ? WHERE id = ?
`);
