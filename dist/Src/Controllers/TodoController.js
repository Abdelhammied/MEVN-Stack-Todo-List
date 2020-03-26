"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../Models/Todo");
const ResponseHandler_1 = require("../Requests/Src/ResponseHandler");
class TodoController {
    static getTodosForAuthenticatedUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userTodos = yield Todo_1.TodoModel.find({ 'user': response.locals.user.id });
            ResponseHandler_1.requestSuccess(response, userTodos);
        });
    }
    static createTodo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, body } = request.body;
                let todo = yield (new Todo_1.TodoModel({
                    title,
                    body,
                    user: response.locals.user.id
                }).save());
                ResponseHandler_1.requestSuccess(response, todo);
            }
            catch (error) {
                ResponseHandler_1.requestFailed(response, error.message);
            }
        });
    }
    static updateTodo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, body, status } = request.body;
                let todo = response.locals.todo;
                yield todo.updateOne({
                    title,
                    body,
                    status
                });
                ResponseHandler_1.requestSuccess(response, 'Updated Successfully', 201);
            }
            catch (error) {
                ResponseHandler_1.requestFailed(response, error.message);
            }
        });
    }
    static deleteTodo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let todo = response.locals.todo;
                yield todo.remove();
                ResponseHandler_1.requestSuccess(response, 'Deleted Successfully', 201);
            }
            catch (error) {
                ResponseHandler_1.requestFailed(response, error.message, error.statusCode);
            }
        });
    }
}
exports.default = TodoController;
