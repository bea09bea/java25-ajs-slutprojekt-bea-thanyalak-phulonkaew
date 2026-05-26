import {db} from './database.config';

//lägga till task i tabell (utan person)
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

//Uppdatera allt
export const updateAllStmt = db.prepare(`
      UPDATE tasks SET title = ?, project = ?, description = ?, deadline = ?, person = ?, category = ? WHERE id = ?
`);

//Uppdatera person & category
export const updateAssignedStmt = db.prepare(`
   UPDATE tasks SET person = ?, category = ? WHERE id = ?
`);