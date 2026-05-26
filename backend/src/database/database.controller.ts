import * as stmt from './database.statements';
import { task, newTask } from '../models/task.types';

export const getAllTasks = ():task[] => {
     const rows = stmt.getAllTasksStmt.all();

     return rows.map((row: any) => ({
          id: row.id,
          title: row.title,
          project: row.project,
          description: row.description,
          deadline: row.deadline,
          person: row.person,
          status: row.status,
          category: row.category
     }));
}

export const createTask = (newTask: newTask): number => {
     const result = stmt.createTaskStmt.run(        
          newTask.title, 
          newTask.project, 
          newTask.description, 
          newTask.deadline,
          newTask.person,
          newTask.category
     );

     return result.lastInsertRowid as number;
}

export const updateStatus = (id: number, status: string):number => {
     const result = stmt.updateStatusStmt.run(status, id);
     return result.changes as number;
}

export const updateAssigned = (id:number, person:string, category:string) => {
     const result = stmt.updateAssignedStmt.run(person, category, id);
     return result.changes 
}

export const updateAll = (id:number,title: string, project:string, description:string, deadline:string, person:string, category:string) => {
     const result = stmt.updateAllStmt.run(title, project,deadline,description,person,category, id)
     return result.changes
}

export const deleteTask = (id:number):number => {
     const result = stmt.deleteTaskStmt.run(id);

     return result.changes as number;
}