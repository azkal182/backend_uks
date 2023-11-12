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
const user_service_1 = __importDefault(require("../service/user-service"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.register(req.body);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.login(req.body);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // @ts-ignore;
        const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
        const result = yield user_service_1.default.get(username);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const username = req.user.username;
        const request = req.body;
        request.username = username;
        const result = yield user_service_1.default.update(request);
        res.status(200).json({
            data: result
        });
    }
    catch (e) {
        next(e);
    }
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        yield user_service_1.default.logout(req.user.username);
        res.status(200).json({
            data: "OK"
        });
    }
    catch (e) {
        next(e);
    }
});
exports.default = {
    register,
    login,
    get,
    update,
    logout
};
