"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotAuthenticated extends Error {
    constructor() {
        super(...arguments);
        this.message = "unauthenticated";
        this.statusCode = 401;
    }
}
exports.NotAuthenticated = NotAuthenticated;
