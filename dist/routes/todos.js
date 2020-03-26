"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = __importDefault(require("../Src/Middleware/Authentication"));
const TodoController_1 = __importDefault(require("../Src/Controllers/TodoController"));
const TodoRequest_1 = __importDefault(require("../Src/Requests/TodoRequest"));
const TodoPolicy_1 = __importDefault(require("../Src/Policy/TodoPolicy"));
const router = express_1.default.Router();
router.get('/todos', Authentication_1.default.auth, TodoController_1.default.getTodosForAuthenticatedUser);
router.post('/todos/create', Authentication_1.default.auth, TodoRequest_1.default.validateCreateTodo, TodoController_1.default.createTodo);
router.post('/todos/:id/update', Authentication_1.default.auth, TodoRequest_1.default.validateUpdateTodo, TodoPolicy_1.default.policy, TodoController_1.default.updateTodo);
router.post('/todos/:id/delete', Authentication_1.default.auth, TodoPolicy_1.default.policy, TodoController_1.default.deleteTodo);
exports.default = router;
