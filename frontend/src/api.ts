import type { Task, NewTask } from "./types";

const BASE_URL = 'http://localhost:3000/tasks/';

export const getAllTasks = async ():Promise<Task[]> => {
     const res = await fetch(BASE_URL);
     const tasks:Task[] = await res.json();

     console.log(tasks)

     return tasks;
}

export const deleteTask = async (id:number) => {
     const options = {
          method: 'DELETE'
     }

     const res = await fetch(BASE_URL + '/' + id, options);

     const data = await res.json();
     return data;
}