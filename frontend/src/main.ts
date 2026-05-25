import { getAllTasks } from "./api";
import { renderTasks } from "./render";

getAllTasks().then(renderTasks)