"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const publicRouter = express_1.default.Router();
exports.publicRouter = publicRouter;
publicRouter.post('/api/users', user_controller_1.default.register);
publicRouter.post('/api/users/login', user_controller_1.default.login);
