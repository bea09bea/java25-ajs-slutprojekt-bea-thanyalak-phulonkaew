import express from "express";
import taskRoutes from './src/routes/task.route'
import cors from "cors"

//Skapa express app
const app = express();


//.use() -> Middleware för inkommande requests:

//om request innehåller JSON, konverta till Javascript-objekt
app.use(express.json());

//Cors gör så frontend kan kommunicera med backend
app.use(cors());

//haneterar endpoint 
app.use('/tasks', taskRoutes);

//export app så server kan använda den
export default app;