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
exports.deleteTask = exports.updateAll = exports.assign = exports.updateStatus = exports.createTask = exports.getAllTasks = void 0;
const stmt = __importStar(require("./database.statements"));
//funktionen retunerar en array med task-objekt
const getAllTasks = () => {
    //kör SQL-queryn från database.statement
    //behandla resultat som en array av task
    const rows = stmt.getAllTasksStmt.all();
    return rows;
};
exports.getAllTasks = getAllTasks;
//funktionen returnerar ett nummer (id för nya raden i databasen)
const createTask = (newTask) => {
    //kör SQL statement
    const result = stmt.createTaskStmt.run(newTask.title, newTask.project, newTask.description, newTask.deadline, newTask.category);
    return result.lastInsertRowid;
};
exports.createTask = createTask;
const updateStatus = (id, status) => {
    const result = stmt.updateStatusStmt.run(status, id);
    return result.changes;
};
exports.updateStatus = updateStatus;
const assign = (id, status, person) => {
    const result = stmt.assignStmt.run(status, person, id);
    return result.changes;
};
exports.assign = assign;
const updateAll = (id, title, project, description, deadline, category) => {
    const result = stmt.updateAllStmt.run(title, project, deadline, description, category, id);
    return result.changes;
};
exports.updateAll = updateAll;
const deleteTask = (id) => {
    const result = stmt.deleteTaskStmt.run(id);
    return result.changes > 0;
};
exports.deleteTask = deleteTask;
