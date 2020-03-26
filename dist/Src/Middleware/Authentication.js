"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotAuthenticated_1 = require("../Exceptions/NotAuthenticated");
const ResponseHandler_1 = require("../Requests/Src/ResponseHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
class Authentication {
    static auth(request, response, next) {
        try {
            const token = request.token;
            if (!token) {
                throw new NotAuthenticated_1.NotAuthenticated;
            }
            const tokenDecode = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
            response.locals.user = tokenDecode;
            next();
        }
        catch (error) {
            ResponseHandler_1.requestFailed(response, error.message, error.statusCode);
        }
    }
}
exports.default = Authentication;
