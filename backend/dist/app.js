"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_route_1 = __importDefault(require("./src/routes/task.route"));
const cors_1 = __importDefault(require("cors"));
//Skapa express app
const app = (0, express_1.default)();
//.use() -> Middleware för inkommande requests:
//om request innehåller JSON, konverta till Javascript-objekt
app.use(express_1.default.json());
//Cors gör så frontend kan kommunicera med backend
app.use((0, cors_1.default)());
//haneterar endpoint 
app.use('/tasks', task_route_1.default);
//export app så server kan använda den
exports.default = app;
