import express from "express";
import taskRoutes from './src/routes/task.route'

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);
export default app;


