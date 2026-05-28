import * as stmt from './database.statements';
import { task, newTask } from '../models/task.types';

//funktionen retunerar en array med task-objekt
export const getAllTasks = ():task[] => {

     //kör SQL-queryn från database.statement
     //behandla resultat som en array av task
     const rows = stmt.getAllTasksStmt.all() as task[];

     return rows;
}

//funktionen returnerar ett nummer (id för nya raden i databasen)
export const createTask = (newTask: newTask): number => {
     //kör SQL statement
     const result = stmt.createTaskStmt.run(        
          newTask.title, 
          newTask.project, 
          newTask.description, 
          newTask.deadline,
          newTask.person || 'undefined',
          newTask.category
     );

     return result.lastInsertRowid as number;
}

export const updateStatus = (id: number, status: string):number => {
     const result = stmt.updateStatusStmt.run(status, id);
     return result.changes as number;
}

export const updateAll = (
     id:number,
     title: string, 
     project:string, 
     description:string, 
     deadline:string, 
     person:string, 
     category:string) => {
     const result = stmt.updateAllStmt.run(             title, 
          project,
          deadline,
          description,
          person,
          category, 
          id
     )
     return result.changes
}

export const deleteTask = (id:number):boolean => {
     const result = stmt.deleteTaskStmt.run(id);

     return result.changes > 0;
}