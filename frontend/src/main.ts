import { getAllTasks } from "./api";
import { renderTasks } from "./render";

//Hämta array av task och rendera "task-kort"  
getAllTasks().then(renderTasks)