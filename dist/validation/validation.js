"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const response_error_1 = require("../error/response-error");
const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });
    if (result.error) {
        throw new response_error_1.ResponseError(400, result.error.message);
    }
    else {
        return result.value;
    }
};
exports.validate = validate;
