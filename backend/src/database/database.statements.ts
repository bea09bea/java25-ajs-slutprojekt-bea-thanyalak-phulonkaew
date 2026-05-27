import {db} from './database.config';

//lägga till ny task i tabell
export const createTaskStmt = db.prepare(`
   INSERT INTO tasks (title, project, description, deadline, person, category) VALUES (?,?,?,?,?,?)
`);

//Hämta alla tasks
export const getAllTasksStmt = db.prepare(`
   SELECT * FROM tasks
`);

//Uppdatera status
export const updateStatusStmt = db.prepare(`
   UPDATE tasks SET status = ? WHERE id = ?
`);

//Ta bort task
export const deleteTaskStmt = db.prepare(`
   DELETE FROM tasks WHERE id = ?   
`);

//Uppdatera alla fält utom status & id
export const updateAllStmt = db.prepare(`
      UPDATE tasks SET title = ?, project = ?, description = ?, deadline = ?, person = ?, category = ? WHERE id = ?
`);