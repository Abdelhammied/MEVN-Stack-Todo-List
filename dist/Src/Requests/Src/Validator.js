"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const sprintf_js_1 = require("sprintf-js");
const roles_1 = require("../../Trans/en/roles");
const capitalize = (field) => {
    return field.charAt(0).toUpperCase() + field.slice(1);
};
class Validator {
    constructor(request) {
        this.validatiorErrors = [];
        this.requestBody = request.body;
    }
    propertyExists(property) {
        return this.requestBody.hasOwnProperty(property);
    }
    required(field) {
        if (!this.requestBody.hasOwnProperty(field)) {
            this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.required, [capitalize(field)]));
        }
    }
    string(field) {
        var _a;
        if (this.propertyExists(field)) {
            let value = (_a = Object.getOwnPropertyDescriptor(this.requestBody, field)) === null || _a === void 0 ? void 0 : _a.value;
            if (typeof value == undefined || validator_1.default.isEmpty(value)) {
                this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.string, [capitalize(field)]));
            }
        }
    }
    email(field) {
        var _a;
        if (this.propertyExists(field)) {
            let value = (_a = Object.getOwnPropertyDescriptor(this.requestBody, field)) === null || _a === void 0 ? void 0 : _a.value;
            if (typeof value == undefined || !validator_1.default.isEmail(value)) {
                this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.email, [capitalize(field)]));
            }
        }
    }
    exists(field, values) {
        var _a;
        if (this.requestBody.hasOwnProperty(field)) {
            let value = (_a = Object.getOwnPropertyDescriptor(this.requestBody, field)) === null || _a === void 0 ? void 0 : _a.value;
            value = value.toLowerCase();
            if (!validator_1.default.isIn(value, values)) {
                this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.in, [capitalize(field), values]));
            }
        }
    }
    minLength(field, minLength) {
        var _a;
        if (this.propertyExists(field)) {
            let value = (_a = Object.getOwnPropertyDescriptor(this.requestBody, field)) === null || _a === void 0 ? void 0 : _a.value;
            if (typeof value == undefined ||
                !validator_1.default.isLength(value, { min: minLength })) {
                this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.minLength, [capitalize(field), minLength]));
            }
        }
    }
    maxLength(field, maxLength) {
        var _a;
        if (this.propertyExists(field)) {
            let value = (_a = Object.getOwnPropertyDescriptor(this.requestBody, field)) === null || _a === void 0 ? void 0 : _a.value;
            if (typeof value == undefined ||
                !validator_1.default.isLength(value, { max: maxLength })) {
                this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.maxLength, [capitalize(field), maxLength]));
            }
        }
    }
    matches(field1, field2) {
        var _a, _b;
        if (this.propertyExists(field1) &&
            this.propertyExists(field2)) {
            let value1 = (_a = Object.getOwnPropertyDescriptor(this.requestBody, field1)) === null || _a === void 0 ? void 0 : _a.value;
            let value2 = (_b = Object.getOwnPropertyDescriptor(this.requestBody, field2)) === null || _b === void 0 ? void 0 : _b.value;
            if (typeof value1 == undefined ||
                typeof value2 == undefined ||
                value1 !== value2) {
                this.validatiorErrors.push(sprintf_js_1.vsprintf(roles_1.roles.confirmed, [capitalize(field1), capitalize(field2)]));
            }
        }
    }
}
exports.Validator = Validator;
