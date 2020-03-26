"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSuccess = (response, data, statusCode) => {
    const status_code = statusCode !== null && statusCode !== void 0 ? statusCode : 200;
    response.status(status_code).json({
        data: data,
        code: status_code
    });
};
exports.requestFailed = (response, message, statusCode) => {
    const status_code = statusCode !== null && statusCode !== void 0 ? statusCode : 400;
    response.status(status_code).json({
        message: message,
        code: status_code
    });
};
