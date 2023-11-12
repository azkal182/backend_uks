"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckinValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createCheckinValidation = joi_1.default.object({
    name: joi_1.default.string().max(100).required(),
    address: joi_1.default.string().max(100).required(),
    room: joi_1.default.string().max(100).required(),
    grade: joi_1.default.string().max(100).optional(),
    complaint: joi_1.default.string().max(100).required(),
    status: joi_1.default.string().max(100).required(),
});
exports.createCheckinValidation = createCheckinValidation;
