"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Src/Controllers/AuthController");
const AuthRequest_1 = require("../Src/Requests/AuthRequest");
const Authentication_1 = __importDefault(require("../Src/Middleware/Authentication"));
const router = express_1.default.Router();
router.post('/register', AuthRequest_1.AuthRequest.validateRegisterRequest, AuthController_1.AuthController.register);
router.post('/login', AuthRequest_1.AuthRequest.validateLoginRequest, AuthController_1.AuthController.login);
router.post('/refreshToken', Authentication_1.default.auth, AuthController_1.AuthController.refreshToken);
exports.default = router;
