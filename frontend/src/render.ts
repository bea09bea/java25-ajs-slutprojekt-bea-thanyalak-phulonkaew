import { deleteTask, getAllTasks, updateStatus } from "./api";
import type { Task } from "./types";
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
                    <button class='move toDoing'> < </button>
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

                    await deleteTask(task.id)

                    card.remove();
               });
               
               card.append(btn);
          }
    }
  );
};

