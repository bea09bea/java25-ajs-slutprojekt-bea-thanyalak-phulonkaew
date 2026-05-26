import type { Task } from "./types";

const BASE_URL = 'http://localhost:3000/tasks/';

export const getAllTasks = async ():Promise<Task[]> => {
     const res = await fetch(BASE_URL);
     const tasks:Task[] = await res.json();

     return tasks;
}

export const updateStatus = async (id:number, status:string) => {
     const options = {
        method: 'PATCH',
        body: JSON.stringify({status: status}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"}
          }

     const res = await fetch(BASE_URL + id + '/' + 'status', options);

     if (!res.ok) {
          throw new Error('Kunde inte uppdateras');
     }

     const data = await res.json();
     return data;
}

export const deleteTask = async (id:number) => {
     const options = {
          method: 'DELETE'
     }

     const res = await fetch(BASE_URL + id, options);

     if (!res.ok) {
          throw new Error('Kunde inte radera task');
     }

     const data = await res.json();
     return data;
}