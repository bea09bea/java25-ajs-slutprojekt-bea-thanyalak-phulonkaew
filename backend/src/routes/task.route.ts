import {Router, Request, Response} from 'express';
import {body, param, validationResult} from 'express-validator';
import * as db from '../database/database.controller'; 

//Express router
const router = Router();

//router svarar på HTTP POST med endpoint '/'
router.post('/',

     //body-anrop: Middleware från express-validator
     body('title')
     //.notEmpty -> validation rule
     .notEmpty()
     // Om validation failer sparas detta felmeddelande
     .withMessage('Title is required'),

     body('project')
     .notEmpty()
     .withMessage('Project name is required'),

     body('description')
     .notEmpty()
     .withMessage('Description is required'),

     //måste vara giltigt ISO-datum
     body('deadline')
     .isISO8601()
     .withMessage('Deadline must be a valid date like (2026-05-27)'), 

     //isIn - Skyddar databas mot ogiltiga värden
     body('category')
     .isIn(['ux', 'frontend', 'backend'])
     .withMessage('Invalid category'),
     
     //Route handler - huvudlogiken
     (req: Request,res: Response) => {
     
     //samlar ihop alla express-validator från middleware
     const errors = validationResult(req);

     //error handling
     //return stoppar funktion om blir validationfel
     if (!errors.isEmpty()) {
          return res.status(400).json({
               errors: errors.array(),
          });
     }

     //om data är valid -> skicka bodyn till databas
     db.createTask(req.body);

     //Express skickar JSON tillbaka till frontend
     res.json({
          success: true,
          message: `New task created sucessfully`
     });
});

//router svarar på HTTP GET med endpoint '/'
router.get('/', (req: Request, res: Response) => {
     try {
          const tasks = db.getAllTasks();
          res.json(tasks); 
     } catch (error) {
          res.status(500).json({
               success: false,
               message: 'Could not fetch tasks',
          });
     }
});

//router svarar på HTTP PATCH med endpoint '/id/status'
router.patch('/:id/status',
     param('id')
     .isInt()
     .withMessage('Id must be a number'),

     body('status')
     .notEmpty()
     .withMessage('Status is required')
     .isIn(['new', 'doing', 'done'])
     .withMessage('Invalid status'),

     (req: Request, res: Response)=> {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
               return res.status(400).json({
                    errors: errors.array(),
               });
          }

          const id = Number(req.params.id);
          const {status} = req.body;
          const hasUpdated = db.updateStatus(id, status);

          if (!hasUpdated) {
               return res.status(404).json({
                    success: false,
                    message: 'Task not found',
               });
          }

          res.json({
               success: true,
               message: 'Status updated successfully',
          });
     }
);

router.patch('/:id/assign',
     param('id')
     .isInt()
     .withMessage('Id must be a number'),

     body('person')
     .notEmpty()
     .withMessage('A name is required'),

     body('status')
     .notEmpty()
     .withMessage('Status is required')
     .isIn(['new', 'doing', 'done'])
     .withMessage('Invalid status'),

     (req: Request, res: Response)=> {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
               return res.status(400).json({
                    errors: errors.array(),
               });
          }

          const id = Number(req.params.id);
          const {status, person} = req.body;
          const hasUpdated = db.assign(id, status, person);

          if (!hasUpdated) {
               return res.status(404).json({
                    success: false,
                    message: 'Task not found',
               });
          }

          res.json({
               success: true,
               message: 'Status updated successfully',
          });
     }
);

//router svarar på HTTP PATCH med endpoint '/id/edit'
router.patch('/:id/edit', 
     
     param('id')
     .isInt()
     .withMessage('Id must be a number'),

     body('title')
     .notEmpty()
     .withMessage('Title is required'),

     body('project')
     .notEmpty()
     .withMessage('Project name is required'),

     body('description')
     .notEmpty()
     .withMessage('Description is required'),

     body('deadline')
     .isISO8601()
     .withMessage('Deadline must be a valid date like (2026-05-27)'), 

     body('category')
     .isIn(['ux', 'frontend', 'backend'])
     .withMessage('Invalid category'),
     
     (req: Request, res: Response)=> {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
               return res.status(400).json({
                    errors: errors.array(),
               })
          }

          const id = Number(req.params.id);
          const {
               title, 
               project,
               description,
               deadline,
               category
          } = req.body;

          const hasUpdated = db.updateAll(
               id, 
               title, 
               project,
               description,
               deadline,
               category
          );

          if (!hasUpdated) {
               return res.status(404).json({
                    success: false,
                    message: 'Task not found',
               });
          }

          res.json({
               success: true,
               message: 'Updated task successfully',
          });
     }
);

//router svarar på HTTP DELETE med endpoint '/id'
router.delete('/:id', 
     param('id')
     .isInt()
     .withMessage('Id must be a number'),

     (req:Request, res:Response)=> {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
               return res.status(400).json({
                    errors: errors.array(),
               });
          }

          try {
               const id = Number(req.params.id);
               const hasDeleted = db.deleteTask(id);

               if (!hasDeleted) {
                    return res.status(404).json({
                         success: false,
                         message: 'Task not found',
                    });
               }

               res.json({
                    success: true,
                    message: 'Deleted successfully',
               });
          } catch (error) {
               res.status(500).json({
                    success: false,
                    message: 'Could not delete task',
               });
          }
     }
);

export default router;