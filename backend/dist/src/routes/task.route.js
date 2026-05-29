"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db = __importStar(require("../database/database.controller"));
//Express router
const router = (0, express_1.Router)();
//router svarar på HTTP POST med endpoint '/'
router.post('/', 
//body-anrop: Middleware från express-validator
(0, express_validator_1.body)('title')
    //.notEmpty -> validation rule
    .notEmpty()
    // Om validation failer sparas detta felmeddelande
    .withMessage('Title is required'), (0, express_validator_1.body)('project')
    .notEmpty()
    .withMessage('Project name is required'), (0, express_validator_1.body)('description')
    .notEmpty()
    .withMessage('Description is required'), 
//måste vara giltigt ISO-datum
(0, express_validator_1.body)('deadline')
    .isISO8601()
    .withMessage('Deadline must be a valid date like (2026-05-27)'), 
//isIn - Skyddar databas mot ogiltiga värden
(0, express_validator_1.body)('category')
    .isIn(['ux', 'frontend', 'backend'])
    .withMessage('Invalid category'), 
//Route handler - huvudlogiken
(req, res) => {
    //samlar ihop alla express-validator från middleware
    const errors = (0, express_validator_1.validationResult)(req);
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
router.get('/', (req, res) => {
    try {
        const tasks = db.getAllTasks();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Could not fetch tasks',
        });
    }
});
//router svarar på HTTP PATCH med endpoint '/id/status'
router.patch('/:id/status', (0, express_validator_1.param)('id')
    .isInt()
    .withMessage('Id must be a number'), (0, express_validator_1.body)('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['new', 'doing', 'done'])
    .withMessage('Invalid status'), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const id = Number(req.params.id);
    const { status } = req.body;
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
});
router.patch('/:id/assign', (0, express_validator_1.param)('id')
    .isInt()
    .withMessage('Id must be a number'), (0, express_validator_1.body)('person')
    .notEmpty()
    .withMessage('A name is required'), (0, express_validator_1.body)('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['new', 'doing', 'done'])
    .withMessage('Invalid status'), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const id = Number(req.params.id);
    const { status, person } = req.body;
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
});
//router svarar på HTTP PATCH med endpoint '/id/edit'
router.patch('/:id/edit', (0, express_validator_1.param)('id')
    .isInt()
    .withMessage('Id must be a number'), (0, express_validator_1.body)('title')
    .notEmpty()
    .withMessage('Title is required'), (0, express_validator_1.body)('project')
    .notEmpty()
    .withMessage('Project name is required'), (0, express_validator_1.body)('description')
    .notEmpty()
    .withMessage('Description is required'), (0, express_validator_1.body)('deadline')
    .isISO8601()
    .withMessage('Deadline must be a valid date like (2026-05-27)'), (0, express_validator_1.body)('category')
    .isIn(['ux', 'frontend', 'backend'])
    .withMessage('Invalid category'), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const id = Number(req.params.id);
    const { title, project, description, deadline, category } = req.body;
    const hasUpdated = db.updateAll(id, title, project, description, deadline, category);
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
});
//router svarar på HTTP DELETE med endpoint '/id'
router.delete('/:id', (0, express_validator_1.param)('id')
    .isInt()
    .withMessage('Id must be a number'), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Could not delete task',
        });
    }
});
exports.default = router;
