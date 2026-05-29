import { getAllTasks } from "./api";
import { renderTasks, initEvents } from "./render";

//Hämta array av task och rendera "task-kort" och skapa ny task funciton
getAllTasks().then(renderTasks).then(initEvents);