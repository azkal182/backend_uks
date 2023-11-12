"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(auth_middleware_1.authMiddleware);
// User API
userRouter.get('/api/users/current', user_controller_1.default.get);
userRouter.patch('/api/users/current', user_controller_1.default.update);
userRouter.delete('/api/users/logout', user_controller_1.default.logout);
