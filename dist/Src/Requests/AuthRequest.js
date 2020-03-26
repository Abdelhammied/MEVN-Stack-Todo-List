"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler_1 = require("./Src/ResponseHandler");
const Validator_1 = require("./Src/Validator");
class AuthRequest {
    static validateRegisterRequest(request, response, next) {
        let validate = new Validator_1.Validator(request);
        validate.required('username');
        validate.string('username');
        validate.minLength('username', 6);
        validate.required('email');
        validate.email('email');
        validate.required('password');
        validate.minLength('password', 6);
        validate.required('confirmPassword');
        validate.matches('password', 'confirmPassword');
        if (validate.validatiorErrors.length > 0) {
            ResponseHandler_1.requestFailed(response, validate.validatiorErrors[0]);
        }
        else {
            next();
        }
    }
    static validateLoginRequest(request, response, next) {
        let validate = new Validator_1.Validator(request);
        validate.required('email');
        validate.email('email');
        validate.required('password');
        if (validate.validatiorErrors.length > 0) {
            ResponseHandler_1.requestFailed(response, validate.validatiorErrors[0]);
        }
        else {
            next();
        }
    }
}
exports.AuthRequest = AuthRequest;
