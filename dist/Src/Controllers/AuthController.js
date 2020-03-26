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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roles_1 = require("../Trans/en/roles");
const User_1 = require("../Models/User");
const ResponseHandler_1 = require("../Requests/Src/ResponseHandler");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const fetchLogin = (id, username, email) => {
    const user = {
        id,
        username,
        email
    };
    const token = jsonwebtoken_1.default.sign(user, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRATION_TIME
    });
    return {
        token,
        user
    };
};
class AuthController {
    static register(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = request.body;
                let user = yield User_1.UserModel.findOne({ email });
                if (user) {
                    throw new Error(roles_1.roles.auth.email_exists);
                }
                user = new User_1.UserModel({
                    username,
                    email,
                    password
                });
                yield user.save();
                ResponseHandler_1.requestSuccess(response, fetchLogin(user.get('_id'), username, email));
            }
            catch (error) {
                ResponseHandler_1.requestFailed(response, error.message);
            }
        });
    }
    static login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = request.body;
                const user = yield User_1.UserModel.findOne({
                    email
                }, '+password');
                if (!user) {
                    throw new Error(roles_1.roles.auth.failed);
                }
                const isPasswordValid = yield User_1.UserHelper.verifyUserPassword(password, user.get('password'));
                if (!isPasswordValid) {
                    throw new Error(roles_1.roles.auth.failed);
                }
                ResponseHandler_1.requestSuccess(response, fetchLogin(user.get('_id'), user.get('username'), email));
            }
            catch (error) {
                ResponseHandler_1.requestFailed(response, error.message);
            }
        });
    }
    static refreshToken(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user } = response.locals;
            ResponseHandler_1.requestSuccess(response, fetchLogin(user.id, user.username, user.email));
        });
    }
    static verifyEmail(request, response, next) { }
}
exports.AuthController = AuthController;
