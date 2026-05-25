import { deleteTask } from "./api";
import type { Task, NewTask } from "./types";

const getExtraContent = (task:Task) => {
     switch (task.status) {
          case 'new':
               return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
                    <button class='move' id='fromNew'> > </button>
               `
             
           case 'doing':
                return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
                    <button class='move' id='toNew> < </button>
                    <button class='move'id='toDone> > </button> 
               `
              
          case 'done':
               return `
                    <p>Role: ${task.category}</p>
                    <p>Project: ${task.project}</p>
                    <p>Deadline: ${task.deadline}</p>
                    <p>Description: ${task.description}</p>
                    <button class='move' id='toDoing> < </button>
               `
          default:
               return "";
     }
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
              } else {
                    extra.innerHTML = getExtraContent(task);

                    card.append(extra)
              }
          });

          //visa radera knapp bara för done-column
          if (task.status === 'done') {
               
               const btn = document.createElement('button');
               btn.classList = 'delete-btn';
               
               btn.textContent = 'X';

               btn.addEventListener('click', ()=> {
                    console.log('trycker på radera')
                    /* deleteTask(task.id) */
               })
               
               card.append(btn);
          }

          const fromNew = document.querySelector('#fromNew');
          fromNew?.addEventListener('click', () => {
               //Flytta från new till doing
          })

          const toNew = document.querySelector('#toNew');
          toNew?.addEventListener('click', () => {
               //Flytta från doing till new
          })

          const toDone = document.querySelector('#toDone');
          toDone?.addEventListener('click', () => {
               //Flytta från doing till done
          })

          const toDoing = document.querySelector('#toDoing');
          toDoing?.addEventListener('click', () => {
               //Flytta från done till doing
          })

    }
  );
};

