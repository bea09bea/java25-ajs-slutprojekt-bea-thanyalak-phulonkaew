import { createNewTask, deleteTask, getAllTasks, updateAll, updateStatus, assign } from "./api";
import type { Task } from "./types";

const clearBoard = () => {
     const cards = document.querySelectorAll('.card');

     cards.forEach((card ) => {
          card.remove();
     });
}

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
               `
              
          case 'done':
               return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
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

//Skapa ny task knapp
export const initEvents = () => {
     //Skapa ny task
          const editContainer = document.querySelector('.editContainer');
          const createBtn = document.querySelector('.createNew');

          createBtn?.addEventListener('click', () =>{
               const formCreateNewTask = document.createElement('form');
               if (!editContainer) return
                         editContainer.innerHTML = '';

                         formCreateNewTask.innerHTML = `
                              <h2 class="editTitel">Fill all boxes to create new task: </h2>
                              <label for="titel">Titel:</label>
                              <input type="text" id="titel" name="titel" >

                              <label for="pName">Project name:</label>
                              <input type="text" id="pName" name="pName">

                              <label for="description">Description:</label>
                              <input type="text" id="description" name="description">

                              <label for="deadline">Deadline:</label>
                              <input
                                   type="datetime-local"
                                   id="deadline"
                                   name="deadline"
                                   value="2026-06-12T19:30" 
                              />

                              <label for="category">Role:</label>
                              <select id="category" name="category">
                                   <option value="ux">UX</option>
                                   <option value="frontend">Frontend</option>
                                   <option value="backend">Backend</option>
                              </select>

                              <input class="Savebtn" type="submit" value="Save">
                         `
                         editContainer?.append(formCreateNewTask);

                         formCreateNewTask.addEventListener('submit', async (e)=> {
                              e.preventDefault();
                              e.stopPropagation();

                              const titel = (formCreateNewTask.querySelector('#titel') as HTMLInputElement).value;
                              const project = (formCreateNewTask.querySelector('#pName') as HTMLInputElement).value;
                              const description = (formCreateNewTask.querySelector('#description') as HTMLInputElement).value;
                              const deadline = (formCreateNewTask.querySelector('#deadline') as HTMLInputElement).value;
                              const category = (formCreateNewTask.querySelector('#category') as HTMLSelectElement).value;

                              const result = await createNewTask(
                                   titel,
                                   project,
                                   description,
                                   deadline,
                                   category
                              );
                              formCreateNewTask.reset();
                              alert(result.message);
                              await refreshTasks();
                         })

          });
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

                          // Fråga efter namn
                         const person = prompt("Assign this task to:");

                         // Om användaren trycker Cancel eller lämnar tomt
                         if (!person) return;
                       
                         const newStatus = 'doing';

                         await assign(task.id, newStatus, person);
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

                         const editForm = document.createElement('form');

                         editForm.innerHTML = `
                              <h2 class="editTitel">Edit task: </h2>
                              <label for="titel">Titel:</label>
                              <input type="text" id="titel" name="titel" value="${task.title}">

                              <label for="pName">Project name:</label>
                              <input type="text" id="pName" name="pName" 
                              value="${task.project}">

                              <label for="description">Description:</label>
                              <input type="text" id="description" name="description" 
                              value="${task.description}">

                              <label for="deadline">Deadline:</label>
                              <input
                                   type="datetime-local"
                                   id="deadline"
                                   name="deadline"
                                   value="2026-06-12T19:30" 
                              />

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
                         editContainer?.append(editForm);

                         editForm.addEventListener('submit', async (e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              const title = (editForm.querySelector('#titel') as HTMLInputElement).value;
                              const project = (editForm.querySelector('#pName') as HTMLInputElement).value;
                              const description = (editForm.querySelector('#description') as HTMLInputElement).value;
                              const deadline = (editForm.querySelector('#deadline') as HTMLInputElement).value;
                              const category = (editForm.querySelector('#category') as HTMLSelectElement).value;

                              const result = await updateAll(
                                   task.id,
                                   title,
                                   project,
                                   description,
                                   deadline,
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