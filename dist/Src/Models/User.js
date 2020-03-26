"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        set: (value) => {
            return bcrypt.hashSync(value, salt);
        },
        select: false
    },
    created_at: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now().toLocaleString
    }
});
exports.UserHelper = class UserHelper {
    static verifyUserPassword(plainPassword, hashedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hashedPassword)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
};
exports.UserModel = mongoose_1.default.model('users', UserSchema);
