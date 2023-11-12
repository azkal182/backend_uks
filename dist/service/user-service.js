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
const validation_1 = require("../validation/validation");
const user_validation_1 = require("../validation/user-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jwt_1 = require("../utils/jwt");
const register = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, validation_1.validate)(user_validation_1.registerUserValidation, request);
    const countUser = yield database_1.prismaClient.user.count({
        where: {
            username: user.username
        }
    });
    if (countUser === 1) {
        throw new response_error_1.ResponseError(400, "Username already exists");
    }
    user.password = yield bcrypt_1.default.hash(user.password, 10);
    return database_1.prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
});
const login = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const loginRequest = (0, validation_1.validate)(user_validation_1.loginUserValidation, request);
    const user = yield database_1.prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            name: true,
            password: true
        }
    });
    if (!user) {
        throw new response_error_1.ResponseError(401, "Username or password wrong");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new response_error_1.ResponseError(401, "Username or password wrong");
    }
    const jwtToken = (0, jwt_1.generateAccessToken)({ username: user.username, name: user.name });
    const token = (0, uuid_1.v4)().toString();
    yield database_1.prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
    return {
        jwtToken: jwtToken,
        token: token
    };
});
const get = (username) => __awaiter(void 0, void 0, void 0, function* () {
    username = (0, validation_1.validate)(user_validation_1.getUserValidation, username);
    const user = yield database_1.prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    });
    if (!user) {
        throw new response_error_1.ResponseError(404, "user is not found");
    }
    return user;
});
const update = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, validation_1.validate)(user_validation_1.updateUserValidation, request);
    const totalUserInDatabase = yield database_1.prismaClient.user.count({
        where: {
            username: user.username
        }
    });
    if (totalUserInDatabase !== 1) {
        throw new response_error_1.ResponseError(404, "user is not found");
    }
    const data = {};
    if (user.name) {
        data.name = user.name;
    }
    if (user.password) {
        data.password = yield bcrypt_1.default.hash(user.password, 10);
    }
    return database_1.prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    });
});
const logout = (username) => __awaiter(void 0, void 0, void 0, function* () {
    username = (0, validation_1.validate)(user_validation_1.getUserValidation, username);
    const user = yield database_1.prismaClient.user.findUnique({
        where: {
            username: username
        }
    });
    if (!user) {
        throw new response_error_1.ResponseError(404, "user is not found");
    }
    return database_1.prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    });
});
exports.default = {
    register,
    login,
    get,
    update,
    logout
};
