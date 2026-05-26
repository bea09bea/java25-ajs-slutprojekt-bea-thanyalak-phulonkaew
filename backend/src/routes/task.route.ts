import {Router} from 'express';
import * as db from '../database/database.controller' 

const router = Router();

router.post('/', (req: any,res: any) => {
     const id = db.createTask(req.body);
     res.json({
          message: `New task created with id ${id}`});
});

router.get('/', (req, res) => {
     const tasks = db.getAllTasks();
     res.json(tasks);
});

router.patch('/:id/status', (req, res)=> {
     const id = Number(req.params.id);
     const {status} = req.body;
     const hasUpdated = db.updateStatus(id, status);

     const message = hasUpdated? 'success':'failed'
     res.json({message});
});

router.patch('/:id/assigned', (req, res)=> {
     const id = Number(req.params.id);
     const {person, category} = req.body;

     if(!person || !category) {
          return res.status(400).json({
               message: 'person and category required'
          });
     }

     const hasUpdated = db.updateAssigned(id, person, category);

     const message = hasUpdated? 'success':'failed'
     res.json({message});
});

//Update all
router.patch('/:id/edit', (req, res)=> {
     const id = Number(req.params.id);
     const {title, project,deadline,description,person,category} = req.body;

     if(!title || !project || !deadline || !description || !person || !category) {
          return res.status(400).json({
               message: 'Failed to update'
          });
     }

     const hasUpdated = db.updateAll(id, title, project,deadline,description,person,category);

     const message = hasUpdated? 'updated successfully':'failed to update'
     res.json({message});
});


router.delete('/:id', (req, res)=> {
     const id = Number(req.params.id);
     const isDeleted = db.deleteTask(id);
     const message = isDeleted? 'deleted successfully':'failed to delete'
     res.json({message});
});

export default router;