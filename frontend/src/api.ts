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
          throw new Error('Could not update Status');
     }

     const data = await res.json();
     return data;
}

export const updateAll = async (id:number, title:string, project:string, description:string, deadline:string, person:string, status:string, category:string) => {
     const options = {
        method: 'PATCH',
        body: JSON.stringify({
          id: id,
          title: title,
          project: project,
          description: description,
          deadline: deadline,
          person: person,
          status: status,
          category: category
          }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"}
          }

     const res = await fetch(BASE_URL + id + '/' + 'edit', options);

     if (!res.ok) {
          throw new Error('Could not update');
     }

     const data = await res.json();
     return data;
}

export const createNewTask = async (title:string, project:string, description:string, deadline:string, person:string, category:string) => {
     const options = {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          project: project,
          description: description,
          deadline: deadline,
          person: person,
          category: category
          }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"}
          }

     const res = await fetch(BASE_URL, options);

     if (!res.ok) {
          throw new Error('Could not create new task');
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
          throw new Error('Could not delete task');
     }

     const data = await res.json();
     return data;
}