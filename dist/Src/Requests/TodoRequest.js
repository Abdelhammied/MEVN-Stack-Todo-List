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
const ResponseHandler_1 = require("./Src/ResponseHandler");
const Validator_1 = require("./Src/Validator");
class TodoRequest {
    static validateCreateTodo(request, response, next) {
        let validate = new Validator_1.Validator(request);
        validate.required('title');
        validate.string('title');
        validate.minLength('title', 6);
        validate.maxLength('title', 255);
        validate.required('body');
        validate.string('body');
        validate.minLength('title', 6);
        if (validate.validatiorErrors.length > 0) {
            ResponseHandler_1.requestFailed(response, validate.validatiorErrors[0]);
        }
        else {
            next();
        }
    }
    static validateUpdateTodo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validate = new Validator_1.Validator(request);
            validate.required('title');
            validate.string('title');
            validate.minLength('title', 6);
            validate.maxLength('title', 255);
            validate.required('body');
            validate.string('body');
            validate.minLength('title', 6);
            validate.required('status');
            validate.string('status');
            validate.exists('status', ['pending', 'completed']);
            if (validate.validatiorErrors.length > 0) {
                ResponseHandler_1.requestFailed(response, validate.validatiorErrors[0]);
            }
            else {
                next();
            }
        });
    }
}
exports.default = TodoRequest;
