import { deleteTask, getAllTasks, updateAll, updateStatus } from "./api";
import type { Task, NewTask } from "./types";
import {clearBoard} from "./uxFunctions"

const getExtraContent = (task:Task) => {
     switch (task.status) {
          case 'new':
               return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
                    <button class='move fromNew'> > </button>
                    <button class='edit'>&#9998;</button>
               `
             
           case 'doing':
                return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
                    <button class='move toNew'> < </button>
                    <button class='move toDone'> > </button> 
                    <button class='edit'>&#9998;</button>
               `
              
          case 'done':
               return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
                    <button class='move toDoing'> < </button>
                    <button class='edit'>&#9998;</button>
               `
          default:
               return "";
     }
}

const refreshTasks = async () => {
     clearBoard();
     const updatedTasks = await getAllTasks();

     renderTasks(updatedTasks);
}

export const renderTasks = (tasks: Task[]) => {
     tasks.forEach((task) => {
          const card = document.createElement('div');
          card.classList = 'card';

          card.innerHTML = `
               <h3>${task.title}</h3>
               <p>Assigned to: ${task.person}</p>
          `;

          const column = document.querySelector(`.${task.status}-column`);
          column?.append(card);

          const extra = document.createElement('div');
          extra.classList = 'extraInfo';
       
          //Skapa .extraInfo om det inte finns vid tryck
          card.addEventListener('click', ()=> {
               const exist = card.querySelector('.extraInfo');

               if (exist) {
                    exist.remove();
               }
               else {
               extra.innerHTML = getExtraContent(task);

               const fromNew = extra.querySelector('.fromNew');
                    fromNew?.addEventListener('click', async (e) => {
                         //Flytta från new till doing
                         e.stopPropagation();

                         const newStatus = 'doing';

                         await updateStatus(task.id, newStatus);
                         await refreshTasks();
                    })

                    const toNew = extra.querySelector('.toNew');
                    toNew?.addEventListener('click', async (e) => {
                         //Flytta från doing till new
                         e.stopPropagation();

                         const newStatus = 'new';

                         await updateStatus(task.id, newStatus);
                         await refreshTasks();
                    })

                    const toDone = extra.querySelector('.toDone');
                    toDone?.addEventListener('click', async (e) => {
                         //Flytta från doing till done
                         e.stopPropagation();
                         
                         const newStatus = 'done';

                         await updateStatus(task.id, newStatus);
                         await refreshTasks();
                    })

                    const toDoing = extra.querySelector('.toDoing');
                    toDoing?.addEventListener('click', async (e) => {
                         //Flytta från done till doing
                         e.stopPropagation();

                         const newStatus = 'doing';

                         await updateStatus(task.id, newStatus);
                         await refreshTasks();
                         })

                    //Redigera
                    const editBtn = extra.querySelector('.edit');
                    editBtn?.addEventListener('click', (e)=> {
                         e.stopPropagation();

                         const editContainer = document.querySelector('.editContainer');

                         if (!editContainer) return
                         editContainer.innerHTML = '';

                         const form = document.createElement('form');

                         form.innerHTML = `
                              <h2 class="editTitel">Edit: </h2>
                              <label for="titel">Titel:</label>
                              <input type="text" id="titel" name="titel" value="${task.title}">

                              <label for="pName">Project name:</label>
                              <input type="text" id="pName" name="pName" 
                              value="${task.project}">

                              <label for="description">Description:</label>
                              <input type="text" id="description" name="description" 
                              value="${task.description}">

                              <label for="deadline">Deadline:</label>
                              <input type="text" id="deadline" name="deadline" 
                              value="${task.deadline}">
                              
                              <label for="person">Assigned to:</label>
                              <input type="text" id="person" name="person" 
                              value="${task.person}">

                              <label for="category">Role:</label>
                              <select id="category" name="category">
                                   <option value="ux" ${task.category === 'ux' ? 'selected' : ''}>UX</option>

                                   <option value="frontend" ${task.category === 'frontend' ? 'selected' : ''}>
                                        Frontend
                                   </option>

                                   <option value="backend" ${task.category === 'backend' ? 'selected' : ''}>
                                        Backend
                                   </option>
                              </select>

                              <input class="Savebtn" type="submit" value="Save">
                         `
                         editContainer?.append(form);

                         form.addEventListener('submit', async (e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              const titel = (form.querySelector('#titel') as HTMLInputElement).value;
                              const project = (form.querySelector('#pName') as HTMLInputElement).value;
                              const description = (form.querySelector('#description') as HTMLInputElement).value;
                              const deadline = (form.querySelector('#deadline') as HTMLInputElement).value;
                              const person = (form.querySelector('#person') as HTMLInputElement).value;
                              const category = (form.querySelector('#category') as HTMLSelectElement).value;

                              const result = await updateAll(
                                   task.id,
                                   titel,
                                   project,
                                   deadline,
                                   description,
                                   person,
                                   task.status,
                                   category
                              );
                              alert(result.message);
                              await refreshTasks();
                         })
                         
                    })

                    card.append(extra);
               }
          });

          //radera knapp bara för done-column
          if (task.status === 'done') {
               
               const btn = document.createElement('button');
               btn.classList = 'delete-btn';
               
               btn.textContent = 'X';

               btn.addEventListener('click', async (e)=> {
                    e.stopPropagation();

                    const result = await deleteTask(task.id)
                    alert(result.message);

                    card.remove();
               });
               
               card.append(btn);
          }
    }
  );
};

