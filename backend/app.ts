import express from "express";
import taskRoutes from './src/routes/task.route'
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());
app.use('/tasks', taskRoutes);
export default app;